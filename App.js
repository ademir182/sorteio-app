// Importação
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';

// Declaração do componente App
export default function App() {
  // Declaração de estados utilizando a função useState do React
  const [names, setNames] = useState('');
  const [numSelected, setNumSelected] = useState(4);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função para lidar com o botão de sorteio
  const handlePress = () => {
    // Validar a entrada
    if (!names.trim()) {
      Alert.alert('Erro', 'Digite pelo menos um nome para sortear.');
      return;
    }

    const namesArray = names.split('\n').filter(name => name.trim() !== '');
     // Transforma a string de nomes em um array e remove nomes vazios
    if (namesArray.length < numSelected) {
       // Verifica se há nomes suficientes para o sorteio
      Alert.alert('Erro', `Não há nomes suficientes para sortear ${numSelected}.`);
      return;
    }

    // Sortear e exibir o resultado
    setIsLoading(true);
    setTimeout(() => {
      const shuffled = namesArray.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numSelected);
      setResult(selected.join(', '));
      setIsLoading(false);
    }, 2000);
  }

  // Função para lidar com o botão de reset
  const handleReset = () => {
    setResult('');// Limpa o resultado
    setNames(''); //Limpa o campo de nomes digitados
  }

  //Renderização do componente
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorteio de Nomes</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite os nomes (um por linha)"
        multiline
        onChangeText={text => setNames(text)}
        value={names}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de nomes a sortear"
        keyboardType="numeric"
        onChangeText={text => setNumSelected(parseInt(text) || 4)}
        value={numSelected.toString()}
      />
      <Button title="Sortear" onPress={handlePress} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {result !== '' && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Resultado:</Text>
          <Text style={styles.resultText}>{result}</Text>
          <Button title="Reset" onPress={handleReset} />
        </View>
      )}
    </View>
  );
}

// Estilização do componente utilizando css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

