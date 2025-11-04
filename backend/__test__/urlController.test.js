const request = require("supertest");
const { app } = require("../index.js");
const mongoose = require("mongoose");
require("dotenv").config(); // Make sure environment variables are loaded
const Url = require("../models/Urls.js");
const User = require("../models/User.js");

describe("URL Controller API Endpoints", () => {
  // --- Database Connection Setup ---
  beforeAll(async () => {
    const connectionUri = process.env.MONGO_URI_TEST; // Use the specific test URI
    const dbToUse = "jest_db";

    if (!connectionUri) {
      throw new Error("MONGO_URI_TEST environment variable is missing!");
    }
    try {
      await mongoose.connect(connectionUri, {
        dbName: dbToUse, // Specify the test database
      });
      console.log(`Jest connected to TEST database: ${dbToUse}`);
    } catch (error) {
      console.error("Jest failed to connect to TEST database:", error);
      process.exit(1); // Exit if connection fails
    }
  });

  // --- Database Disconnection ---
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close(); // Use connection.close() for better practice
    console.log("Jest disconnected from TEST database");
  });

  // --- Optional: Clean Database Before Each Test ---
  beforeEach(async () => {
    // Example: Clear the Urls collection before each test
    // await Url.deleteMany({});
    //await User.deleteMany({}); // Clear users if needed for auth tests
  });

  // --- Your Tests ---

  // HEALTH CHECK
  it('should return status 200 and { status: "ok" } for GET /health', async () => {
    const res = await request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.status).toBe("ok");
  });

  // CREATE PUBLIC SHORT URL
  it("should return status 201 and {status: [shortcode]} for POST /api/url/public", async () => {
    const longUrl = "https://jestjs.io/docs/using-matchers";
    const res = await request(app)
      .post("/api/url/public")
      .send({ longUrl: longUrl })
      .expect("Content-Type", /json/)
      .expect(201);

    // Check if the body has the shortCode property
    expect(res.body).toHaveProperty("shortCode");
    // Check if the shortCode is a string (basic validation)
    expect(typeof res.body.shortCode).toBe("string");

    // Optional: Clean up the created short URL after test to avoid duplicates
    const Url = mongoose.model("Url");
    await Url.deleteOne({ shortCode: res.body.shortCode });
  });

  //GET SHORTCODE TEST
  it("should redirect to the long Url", async () => {
    const testData = {
      shortCode: "dq6c8y",
      longUrl:
        "https://www.google.com/search?q=sainsbury%27s&oq=sainsbury%27s+&gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyBggBEEUYQDIMCAIQIxgnGIAEGIoFMgoIAxAAGLEDGIAEMgoIBBAAGLEDGIAEMg0IBRAAGIMBGLEDGIAEMgoIBhAAGLEDGIAEMg0IBxAAGIMBGLEDGIAE0gEINTY0NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#rlimm=5226343978907468627",
    };

    // Ensure the shortCode exists in the database before testing the redirect
    await Url.create({
      shortCode: testData.shortCode,
      longUrl: testData.longUrl,
    });

    const res = await request(app).get(`/${testData.shortCode}`).expect(302);

    expect(res.header.location).toBe(testData.longUrl);

    // Clean up after test
    await Url.deleteOne({ shortCode: testData.shortCode });
  });

  //------ AUTH ------

  //USER SIGN UP
  it("should return status code 201 and {user: id, email} for api/auth/signin", async () => {
    const testData = {
      email: "moogoescow8@gmail.com",
      password: "testing123456",
    };

    const res = await request(app)
      .post("/api/auth/signup")
      .send(testData)
      .expect("Content-Type", /json/)
      .expect(201);

    //expect(res.body).toBeInstanceOf(User);
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("id");
  });

  it("should return status code 200 and {user: id, email} for api/auth/login", async () => {
    const testData = {
      email: "moogoescow8@gmail.com",
      password: "testing123456",
    };

    const res = await request(app)
      .post("/api/auth/login")
      .send(testData)
      .expect("Content-Type", /json/)
      .expect(200);

    // expect(res.body).toBeInstanceOf(user);
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("id");
  });

  // --- Nested Describe Block for Authenticated Routes ---
  describe("Authenticated Routes", () => {
    let agent; // Agent for this block
    const testUserCredentials = {
      email: "moogoescow8@gmail.com",
      password: "testing123456",
    };
    let testUserId;

    // Runs once before any test in this 'Authenticated Routes' block
    beforeAll(async () => {
      // Ensure test user exists (might be created in outer beforeEach or here)
      await User.deleteMany({}); // Clean users first
      const user = await User.create(testUserCredentials);
      testUserId = user._id;

      // Create and log in the agent
      agent = request.agent(app);
      await agent.post("/api/auth/login").send(testUserCredentials).expect(200);
    });

    // Runs before each test INSIDE this 'Authenticated Routes' block
    beforeEach(async () => {
      // Clean up URLs before each authenticated test
      await Url.deleteMany({});
    });

    // --- Tests requiring authentication ---
    it("should create a short URL successfully (POST /api/url/createShortUrl)", async () => {
      // Use the 'agent' that's already logged in
      const res = await agent
        .post("/api/url/createShortUrl")
        .send({ longUrl: "https://auth-test.com" })
        .expect(201);

      expect(res.body).toHaveProperty("shortCode");
    });

    it("should delete an owned URL successfully (DELETE /api/url/:id)", async () => {
      // 1. Create a URL owned by the test user first
      const url = await Url.create({
        shortCode: "deltest",
        longUrl: "https://delete-me.com",
        user: testUserId,
      });

      await agent.get("/api/url/").expect(200);

      // 2. Use the 'agent' to delete it
      await agent.delete(`/api/url/${url._id}`).expect(200);

      // 3. Verify it's gone (optional)
      const deletedUrl = await Url.findById(url._id);
      expect(deletedUrl).toBeNull();
    });

    //GET /api/url/
    it("should return a 200 status code and get a list of links sucessfully", async () => {
      await agent.get("/api/url/").expect(200).expect("Content-Type", /json/);
    });

    // Inside describe('Authenticated Routes', ...)

    it("should return analytics data for the authenticated user (GET /api/url/analytics)", async () => {
      // --- 1. Create Test Data ---
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() - 10);

      // Create URLs owned by the testUserId
      await Url.create([
        {
          longUrl: "https://example.com/analytics1",
          shortCode: "analyt1",
          user: testUserId,
          clicks: [
            { timestamp: today }, // Click today
            { timestamp: twoDaysAgo }, // Click 2 days ago
          ],
        },
        {
          longUrl: "https://example.com/analytics2",
          shortCode: "analyt2",
          user: testUserId,
          clicks: [
            { timestamp: twoDaysAgo }, // Click 2 days ago
            { timestamp: tenDaysAgo }, // Click 10 days ago (outside 7-day window)
          ],
        },
        {
          // A url with no clicks
          longUrl: "https://example.com/analytics3",
          shortCode: "analyt3",
          user: testUserId,
          clicks: [],
        },
      ]);

      // --- 2. Make the Request ---
      const response = await agent // Use the logged-in agent
        .get("/api/url/analytics")
        .expect("Content-Type", /json/)
        .expect(200);

      // --- 3. Assert the Response ---
      const analytics = response.body;

      // Check overall structure
      expect(analytics).toHaveProperty("totalLinks");
      expect(analytics).toHaveProperty("totalClicks");
      expect(analytics).toHaveProperty("chartData");

      // Check specific values based on test data
      expect(analytics.totalLinks).toBe(3); // We created 3 URLs for this user
      expect(analytics.totalClicks).toBe(4); // Total clicks added (2 + 2)

      // Check chartData structure and content
      expect(Array.isArray(analytics.chartData)).toBe(true);
      expect(analytics.chartData.length).toBe(7); // Should return 7 days

      // Verify clicks within the last 7 days are counted correctly in chartData
      // (Summing clicks from chartData should match recent clicks)
      const recentClicksInChart = analytics.chartData.reduce(
        (sum, day) => sum + day.clicks,
        0
      );
      // We added 1 click today, 2 clicks two days ago = 3 recent clicks
      expect(recentClicksInChart).toBe(3);

      // Check format of chartData items (optional but good)
      expect(analytics.chartData[0]).toHaveProperty("date"); // e.g., '2025-10-21'
      expect(analytics.chartData[0]).toHaveProperty("clicks"); // e.g., 0
      expect(typeof analytics.chartData[0].date).toBe("string");
      expect(typeof analytics.chartData[0].clicks).toBe("number");
    });
  });
});
