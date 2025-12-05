import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import api from "../../services/api";

export default function StudentListScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este aluno?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: async () => {
            try {
              await api.delete(`/students/${id}`);
              fetchStudents();
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
      <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate("StudentCreate")}>
        <Text style={styles.createText}>Criar Aluno</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate("StudentEdit", { studentId: item.id })}>
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
