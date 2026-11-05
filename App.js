
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [display, setDisplay] = useState("");

  // Calculator  object to define the buttons and their layout
  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C"],
  ];

  // Handle button clicks
 // Handle calculator buttons
const handlePress = (value) => {
  if (value === "C") {
    setDisplay(""); // Clear the display
  } 
  else if (value === "=") {
    try {
      const parts = display.split(/([+\-*/])/); // Split the display into numbers and operator

      const num1 = Number(parts[0]);
      const operator = parts[1];
      const num2 = Number(parts[2]);

      let result;

      if (operator === "+") {
        result = num1 + num2;
      } 
      else if (operator === "-") {
        result = num1 - num2;
      } 
      else if (operator === "*") {
        result = num1 * num2;
      } 
      else if (operator === "/") {
        result = num2 === 0 ? "Error" : num1 / num2;
      }

      setDisplay(
        result === undefined ? "Error" : String(result)
      );
    } catch (error) {
      setDisplay("Error");
    }
  } 
  else {
    setDisplay(display === "Error" ? value : display + value);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>

      <View style={styles.display}>
        <Text style={styles.displayText}>{display || "0"}</Text>
      </View>

      {buttons.map((row, index) => ( // Render each row of buttons
        <View style={styles.row} key={index}>
          {row.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.button,
                ["+", "-", "*", "/"].includes(value) && styles.operator,
                value === "=" && styles.equal,
                value === "C" && styles.clear,
              ]}
              onPress={() => handlePress(value)}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F0FA",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#594570",
    textAlign: "center",
    marginBottom: 20,
  },

  display: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "flex-end",
  },

  displayText: {
    fontSize: 36,
    color: "#594570",
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },

  button: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  operator: {
    backgroundColor: "#E3D8F2",
  },

  equal: {
    backgroundColor: "#A58BC9",
  },

  clear: {
    backgroundColor: "#D9B8D8",
  },

  buttonText: {
    fontSize: 24,
    color: "#594570",
  },
});
