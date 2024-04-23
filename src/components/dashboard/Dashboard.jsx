/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { fetchSpotifyApi } from '../../api/spotifyAPIDemo';

const Dashboard = () => {
  const types = [
    'album',
    'artist',
    'playlist',
    'track',
    'show',
    'episode',
    'audiobook',
  ];

  const [form, setForm] = useState({
    search: '',
    artist: '',
  });

  const [typeSelected, setTypeSelected] = useState('');


  const handleSearch = async () => {
    const params = new URLSearchParams();

    params.append(
      'q',
      encodeURIComponent(`remaster track:${form.search} artist:${form.artist}`)
    );
    params.append('type', typeSelected);

    const queryString = params.toString();
    const url = 'https://api.spotify.com/v1/search';

    const updateUrl = `${url}?${queryString}`;
    const token = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetchSpotifyApi(
      updateUrl,
      'GET',
      null,
      'application/json',
      token
    );
    console.log(response);
  };

  const handlePlayMusic = async (song) => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const data = {
      uris: [song],
    };

    const id_device = "your_device_id";

    const playSong = await fetchSpotifyApi(
      `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
      'PUT',
      JSON.stringify(data),
      'application/json',
      token
    );
    console.log(playSong);
  };


  const handleChange = (e) => {
    const newValues = {
      ...form,
      [e.target.name]: e.target.value,
    };
    console.log(newValues);
    setForm(newValues);
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setTypeSelected(e.target.value);
  };

  return (
    <div className="bg-gradient-to-t from-[#030303] to-[#282828] h-dvh w-screen flex items-center justify-center flex-col">
      <div>
        <h1 className="text-white text-left text-[30px]">Dashboard</h1>
      </div>
      <div className="flex justify-between w-[60%] align-middle items-center">
        <div>
          <p className="text-white text-left text-[15px]">Track</p>
          <input
            className="rounded-[2px] h-5 w-[160px] text-white bg-[#121212] border-[#727272] border-solid border-[1px] hover:ring-1 focus:ring-1  ring-white"
            placeholder="search"
            type="text"
            name="search"
            value={form.search}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-white text-left text-[15px]">Types</p>
          <select
            className="rounded-[2px] h-5 w-[160px] text-white bg-[#121212] border-[#727272] border-solid border-[1px] hover:ring-1 focus:ring-1  ring-white"
            name="types"
            onChange={handleSelectChange}
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-white text-left text-[15px]">Artist</p>
 
          <input
            className="rounded-[2px] h-5 w-[160px] text-white bg-[#121212] border-[#727272] border-solid border-[1px] hover:ring-1 focus:ring-1  ring-white"
            placeholder="Artist"
            type="text"
            name="artist"
            value={form.artist}
            onChange={handleChange}
          />
        </div>
        <div className="pt-[3%]">
          <button
            className="bg-[#1BD760] w-[140px] rounded-[5px] text-[15px] p-1 font-bold "
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
