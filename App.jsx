import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import PickerItem from "./src/PickerItem";
import { api } from "./src/services/api";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [coinSelected, setCoinSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [coinValue, setCoinValue] = useState(null);
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    async function loadCoins() {
      const response = await api.get("all");
      let coinList = [];
      Object.keys(response.data).map((key) => {
        coinList.push({
          key: key,
          label: key,
          value: key
        });
      });

      setCoins(coinList);
      setCoinSelected(coinList[0].key);
      setLoading(false);
    }

    loadCoins();
  }, []);

  async function convert() {
    if(inputValue !== "") {
      const response = await api.get(`/all/${coinSelected}-BRL`);
      let result = (response.data[coinSelected].ask * parseFloat(inputValue));
      setConvertedValue(`${result.toLocaleString("pt-BR", {style:"currency", currency: "BRL"})}`);
      setCoinValue(inputValue);
      Keyboard.dismiss();
    }

    return;
  }

  if(loading) {
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#4CB9E7" size={50} />
    </SafeAreaView>
    );
  } else {
    return(
      <SafeAreaView style={ styles.container }>
        <View>
          <Text style={ styles.titleText }>COINAPP</Text>
        </View>
  
        <View style={ styles.form }>
          <Text style={ styles.textForm }>Select your coin</Text>
          <PickerItem coins={coins} coinSelected={coinSelected} onChange={ (coin) => setCoinSelected(coin) } />
          
          <Text style={ styles.textForm }>Enter a value to convert (R$)</Text>
          <TextInput 
            placeholder="Your value here" 
            keyboardType="numeric" 
            value={ inputValue }
            onChangeText={(value) => setInputValue(value) }
            style={ styles.inputText } 
          />

          <TouchableOpacity style={ styles.button } onPress={ convert }>
            <Text style={ styles.textButton }>Convert</Text>
          </TouchableOpacity>
        </View>

        { convertedValue !== 0 && (
          <View style={ styles.card }>
            <Text style={ styles.qtyCard }>{ coinValue } { coinSelected }</Text>
            <Text style={ styles.textCard }>is equal to</Text>
            <Text style={ styles.totalCard }>{ convertedValue }</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center"
  },
  titleText: {
    fontSize: 25,
    fontWeight: 500,
    color: "#4CB9E7",
    marginTop: 20
  },
  form: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "90%",
    padding: 20,
    marginTop: 30
  },
  textForm: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333333"
  },
  inputText: {
    width: "100%",
    fontSize: 18,
    marginTop: 10
  },
  button: {
    width: "100%",
    backgroundColor: "#4CB9E7",
    height: 40,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  textButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    padding: 20,
    marginTop: 30
  },
  qtyCard: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4CB9E7"
  },
  textCard: {
    fontSize: 15,
    color: "gray",
    marginTop: 5,
    marginBottom: 10
  },
  totalCard: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  }
});