import React, { useState } from 'react';

function Form() {
    const [file, setFile] = useState(null);
    const [name, setNamePerson] = useState('');
    const [description, setDescription] = useState('');


    const submit = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append("image", file);
            formData.append("name", name);
            formData.append("description", description);


            const data = await fetch("http://localhost:7000/api/add", {
                method: "POST",
                body: formData
            });

            // Clear the form fields
            setFile(null);
            setNamePerson("");
            setDescription("");

        } catch (error) {
            console.error(error);
            // Handle the error here, e.g., display an error message to the user.
        }
    }

    return (
        <>
            <div className='form'>
                <form onSubmit={submit} encType="multipart/form-data" method="post" className='form' >
                    <input onChange={e => setFile(e.target.files[0])} name="image" type="file" accept="image/*"></input>
                    <input value={name} onChange={(e) => setNamePerson(e.target.value)} type="text" placeholder='Enter your name'></input>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="enter description for your post"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Form;
