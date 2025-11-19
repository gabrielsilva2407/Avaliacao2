import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Descricao() {
  const route = useRoute();
  const { id } = route.params;

  const [info, setInfo] = useState({});

  async function ById() {
    try {
      const response = await axios.get(
        `https://proweb.leoproti.com.br/alunos/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setInfo(response.data);
    } catch (error) {
      console.log("ERRO", error);
    }
  }

  useEffect(() => {
    ById();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 15,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Linha */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Nome:</Text>
          <Text>{info.nome}</Text>
        </View>

        {/* Linha */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Turma:</Text>
          <Text>{info.turma}</Text>
        </View>

        {/* Linha */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Curso:</Text>
          <Text>{info.curso}</Text>
        </View>

        {/* Linha */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Matrícula:</Text>
          <Text>{info.matricula}</Text>
        </View>
      </View>
    </View>
  );
}