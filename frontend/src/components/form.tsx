import { useState } from "react";

function Form(){

  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();

    try{
      const res = await fetch(`${apiUrl}/api/url/createShortUrl` , {
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({ longUrl: longUrl }),
      })

      if(!res.ok){
        throw new Error(`Response status: ${res.status}`);
      }

      const data = await res.json();

      setShortUrl(data.shortUrl)

    }catch(e){
      console.log(e)
      setError("failed to submit due to server error");
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>Insert URL</label>
        <input
          type="text"
          required
          value={longUrl}
          onChange={(e)=> setLongUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Short Url</h2>
      {shortUrl && <p>{ shortUrl }</p>}
      {error && <p>{ error }</p>}
    </div>
  )
}

export default Form