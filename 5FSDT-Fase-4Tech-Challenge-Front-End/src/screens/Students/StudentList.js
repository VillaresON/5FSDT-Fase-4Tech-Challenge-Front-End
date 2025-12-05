import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import api from "../../services/api";

export default function StudentList({ navigation }) {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (err) {
      console.log("Erro ao carregar estudantes:", err);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadStudents);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Novo Estudante"
        onPress={() => navigation.navigate("StudentCreate")}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={students}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#eee",
              marginTop: 10,
              borderRadius: 8,
            }}
            onPress={() =>
              navigation.navigate("StudentEdit", { student: item })
            }
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
