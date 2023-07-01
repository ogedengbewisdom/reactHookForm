import React from 'react'

export const YoutubeForm = () => {
  return (
    <form>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username'/>

        <label htmlFor='email'>Email</label>
        <input type='text' name='email' id='email'/>

        <label htmlFor='channel'>Channel</label>
        <input type='text' name='channel' id='channel'/>

        <button>Submit</button>
    </form>
  )
}
