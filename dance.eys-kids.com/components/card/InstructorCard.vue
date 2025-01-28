<template>
  <div class="instructor-card">
    <h3>{{ instructor.name }}</h3>
    <p>{{ instructor.description }}</p>
    <button @click="viewMore">View More</button>
  </div>
</template>

<script>
export default {
  props: {
    instructor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewMore() {
      // Logic to view more details about the instructor
      alert(`Viewing more details for ${this.instructor.name}`);
    },
  },
};
</script>

<style scoped>
.instructor-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.instructor-card h3 {
  margin: 0 0 10px;
}
.instructor-card button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.instructor-card button:hover {
  background-color: #0056b3;
}
</style>
