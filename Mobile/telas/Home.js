import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);

  async function Get() {
    try {
      const response = await axios.get(
        "https://proweb.leoproti.com.br/alunos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setInfo(response.data);
    } catch (error) {}
  }

  function onpre() {
    navigation.navigate("Descricao");
  }

  useEffect(() => {
    Get();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#667eea",
        paddingTop: 60,
        alignItems: "center",
      }}
    >
      {}
      <View style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 8,
      }}>
        <Text style={{ 
          fontSize: 32, 
          fontWeight: "bold", 
          color: "#667eea",
          letterSpacing: -0.5,
        }}>
          Lista de Alunos
        </Text>
      </View>

      <FlatList
        data={info}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              maxWidth: 400,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              padding: 20,
              marginBottom: 16,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 8 },
              shadowRadius: 15,
              elevation: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeftWidth: 5,
              borderLeftColor: "#764ba2",
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: "700",
                color: "#2d3748",
                marginBottom: 4,
              }}>
                {item.nome}
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#718096",
                fontWeight: "500",
              }}>
                {item.curso}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Descricao", { id: item.id })}
              style={{
                backgroundColor: "#667eea",
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 12,
                shadowColor: "#667eea",
                shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text style={{ 
                color: "#FFF", 
                fontWeight: "700",
                fontSize: 15,
                letterSpacing: 0.5,
              }}>
                Ver →
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}