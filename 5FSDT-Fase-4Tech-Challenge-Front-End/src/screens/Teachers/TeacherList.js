import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import api from "../../services/api";

export default function TeacherList({ navigation }) {
  const [teachers, setTeachers] = useState([]);

  async function loadTeachers() {
    try {
      const response = await api.get("/teachers");
      setTeachers(response.data);
    } catch (err) {
      console.log("Erro ao carregar professores:", err);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadTeachers);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Novo Professor"
        onPress={() => navigation.navigate("TeacherCreate")}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={teachers}
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
              navigation.navigate("TeacherEdit", { teacher: item })
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
