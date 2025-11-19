import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

export default function Descricao() {
  const route = useRoute();
  const navigation = useNavigation();
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
    <ScrollView
      style={{ flex: 1, backgroundColor: "#667eea" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingTop: 60,
      }}
    >
      {}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignSelf: "flex-start",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 12,
          marginBottom: 20,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text style={{ 
          color: "#667eea", 
          fontWeight: "700",
          fontSize: 16,
        }}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      {}
      <View style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 25,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 8,
      }}>
        <Text style={{ 
          fontSize: 28, 
          fontWeight: "bold", 
          color: "#667eea",
          letterSpacing: -0.5,
        }}>
          Detalhes do Aluno
        </Text>
      </View>

      {}
      <View
        style={{
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          borderRadius: 24,
          padding: 25,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 12,
          borderLeftWidth: 6,
          borderLeftColor: "#764ba2",
        }}
      >
        {}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 16,
            borderBottomWidth: 2,
            borderBottomColor: "#e2e8f0",
          }}
        >
          <Text style={{ 
            fontWeight: "700", 
            fontSize: 16,
            color: "#667eea",
            flex: 1,
          }}>
            Nome:
          </Text>
          <Text style={{
            fontSize: 16,
            color: "#2d3748",
            fontWeight: "500",
            flex: 2,
            textAlign: "right",
          }}>
            {info.nome}
          </Text>
        </View>

        {}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 16,
            borderBottomWidth: 2,
            borderBottomColor: "#e2e8f0",
          }}
        >
          <Text style={{ 
            fontWeight: "700", 
            fontSize: 16,
            color: "#667eea",
            flex: 1,
          }}>
            Turma:
          </Text>
          <Text style={{
            fontSize: 16,
            color: "#2d3748",
            fontWeight: "500",
            flex: 2,
            textAlign: "right",
          }}>
            {info.turma}
          </Text>
        </View>

        {}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 16,
            borderBottomWidth: 2,
            borderBottomColor: "#e2e8f0",
          }}
        >
          <Text style={{ 
            fontWeight: "700", 
            fontSize: 16,
            color: "#667eea",
            flex: 1,
          }}>
            Curso:
          </Text>
          <Text style={{
            fontSize: 16,
            color: "#2d3748",
            fontWeight: "500",
            flex: 2,
            textAlign: "right",
          }}>
            {info.curso}
          </Text>
        </View>

        {}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 16,
          }}
        >
          <Text style={{ 
            fontWeight: "700", 
            fontSize: 16,
            color: "#667eea",
            flex: 1,
          }}>
            Matrícula:
          </Text>
          <Text style={{
            fontSize: 16,
            color: "#2d3748",
            fontWeight: "500",
            flex: 2,
            textAlign: "right",
          }}>
            {info.matricula}
          </Text>
        </View>

        {/* Badge decorativo */}
        <View style={{
          marginTop: 20,
          backgroundColor: "#667eea",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20,
          alignSelf: "center",
        }}>
          <Text style={{
            color: "white",
            fontWeight: "700",
            fontSize: 14,
            letterSpacing: 0.5,
          }}>
            ID: {info.id}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}