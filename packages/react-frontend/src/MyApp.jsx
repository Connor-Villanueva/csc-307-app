import React, { useState, useEffect } from "react";
import Table from "./table";
import Form from "./form";

function MyApp()
{
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    };

    useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => 
            {
                setCharacters(json["users_list"]);
            })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(person)
        });

        return promise;
    };

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status === 201) 
                    return res.json();
                else if (res.status === 400) 
                    throw new Error("User already exists");
                else
                    throw new Error("Cannot add user");

            })
            .then((user) => setCharacters([...characters, user]))
            .catch((error) => {
                console.log(error);
            });
    };

    function deleteUser(person) {
        const promise = fetch(`http://localhost:8000/users/${person._id}`, {
            method : "DELETE",
            hedaers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(person)
        })
        return promise;
    }

    function removeOneCharacter(index) {
        const person = characters[index];
        deleteUser(person)
            .then((res) => {
                if (res.status == 204) {
                    const updated = characters.filter((user) => user._id != person._id);
                    setCharacters(updated);
                }
                else throw new Error("Cannot delete user");
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="container">
            <Table 
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form
                handleSubmit={updateList}
            />
        </div>
    );
    
}

export default MyApp;