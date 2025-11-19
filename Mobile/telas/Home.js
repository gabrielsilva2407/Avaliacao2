import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";

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
        backgroundColor: "#F5F5F5",
        paddingTop: 50,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>
        Lista de Alunos
      </Text>

      <FlatList
        data={info}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              width: 350,
              backgroundColor: "#FFF",
              padding: 15,
              marginBottom: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 3,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{item.nome}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Descricao", { id: item.id })}
              style={{
                backgroundColor: "#000",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "600" }}>Detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}