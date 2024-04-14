 import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css";
import video from '../assets/color.mp4'


function Home() {
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    {/*const [badge, setBadge] = useState("");*/}

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/note/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/note/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/note/", { message, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (<div>
        
        <video className='videoTag' autoPlay loop muted>
    <source src={video} type='video/mp4' />
</video>
        
        <div> <div className="bag">
        <div >
        <h2 className="label">Notes</h2>
        {notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
    </div>
    <h2 className="label">Create a Note</h2>
    <form  className='bag'  onSubmit={createNote}>

        <label htmlFor="title" className="label">Title:</label>
        <br />
        <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label htmlFor="message" className="label">Message:</label>
        <br />
        <textarea
            id="content"
            name="content"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
    </form>

    <a href="/logout" className="link"> <h1 className="link">Want to logout click here</h1></a>

    <a href="https://sanjai-shaarugesh.netlify.app/" className="link2"> <h1 className="link2">This webapp is created by shaarugesh</h1></a>
   
</div>
    </div></div>
       
    );
}

export default Home;