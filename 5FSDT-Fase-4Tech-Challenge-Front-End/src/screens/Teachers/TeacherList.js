import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import api from "../../services/api";

export default function TeacherListScreen({ navigation }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers");
      setTeachers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este professor?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: async () => {
            try {
              await api.delete(`/teachers/${id}`);
              fetchTeachers();
            } catch (err) {
              console.log(err);
            }
          }
        }
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate("TeacherCreate")}>
        <Text style={styles.createText}>Criar Professor</Text>
      </TouchableOpacity>

      <FlatList
        data={teachers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate("TeacherEdit", { teacherId: item.id })}>
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  createBtn: { backgroundColor: "#4caf50", padding: 12, borderRadius: 8, marginBottom: 16 },
  createText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  card: { backgroundColor: "#f5f5f5", padding: 12, borderRadius: 8, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: "bold" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  edit: { color: "#2196f3", fontWeight: "bold" },
  delete: { color: "#f44336", fontWeight: "bold" },
});
