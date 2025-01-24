"use client";
import React, { useState } from "react";

export default function GuessWho() {
  const [namesInput, setNamesInput] = useState("");
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [eliminated, setEliminated] = useState([]);

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const handleAddNames = () => {
    const namesArray = namesInput
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    const uniquePeople = shuffleArray(
      namesArray.map((name, index) => ({
        id: index + 1,
        name,
      }))
    );
    setPeople(uniquePeople);
    setNamesInput("");
    setSelectedPerson(null);
    setEliminated([]);
  };

  const handleGenerateCSSUNames = () => {
    const cssuNames = [
      "Avi Sr",
      "Avi Jr",
      "Chen",
      "Jace",
      "Jerry",
      "Emerson",
      "Daniel",
      "Adi R",
      "Adi G",
      "Loukos",
      "Adrien",
      "Zach",
      "Ben",
      "Sayan",
      "Clarina",
      "Colin",
      "Shanaya",
      "Edison",
      "Jamie",
      "Mayak",
      "Michael",
      "Jason",
      "Hrithik",
      "Ryan",
      "Aleks",
      "Vedant",
      "Danny",
    ];
    const uniquePeople = shuffleArray(
      cssuNames.map((name, index) => ({
        id: index + 1,
        name,
      }))
    );
    setPeople(uniquePeople);
    setSelectedPerson(null);
    setEliminated([]);
  };

  const handleToggleElimination = (id) => {
    if (eliminated.includes(id)) {
      setEliminated(eliminated.filter((el) => el !== id)); // Remove X
    } else {
      setEliminated([...eliminated, id]); // Add X
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Guess Who
      </h1>

      {/* Input for Adding Names */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="names-input"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Enter names (comma-separated):
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <input
            id="names-input"
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            placeholder="e.g., Alice, Bob, Charlie"
            style={{
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={handleAddNames}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Names
          </button>
          <button
            onClick={handleGenerateCSSUNames}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              backgroundColor: "#28A745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            CSSU
          </button>
        </div>
      </div>

      {/* Dropdown for selecting your person */}
      {people.length > 0 && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="select-person"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Choose your person:
          </label>
          <select
            id="select-person"
            onChange={(e) => setSelectedPerson(Number(e.target.value))}
            style={{
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "200px",
            }}
          >
            <option value="">Select a person</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Selected Person Display */}
      {selectedPerson && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          Your person:{" "}
          <span style={{ fontWeight: "bold", color: "#007BFF" }}>
            {people.find((p) => p.id === selectedPerson)?.name}
          </span>
        </p>
      )}
      {/* Name grid */}
      {people.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {people.map((person) => (
            <div
              key={person.id}
              style={{
                padding: "20px",
                height: "80px",
                border: "1px solid black",
                borderRadius: "8px",
                textAlign: "center",
                position: "relative",
                cursor: "pointer",
                backgroundColor:
                  selectedPerson === person.id ? "#D0E8FF" : "white",
                opacity: eliminated.includes(person.id) ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleToggleElimination(person.id)}
            >
              {person.name}
              {eliminated.includes(person.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "red",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  X
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
