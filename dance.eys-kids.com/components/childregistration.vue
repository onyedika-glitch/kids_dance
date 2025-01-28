<template>
    <div class="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 class="text-xl font-bold mb-4">お子様の情報を入力</h2>
      <childregistration />
  
      <form @submit.prevent="submitForm">
        <!-- Child's Name (Kanji) -->
        <label class="block mb-2">お子様のお名前（漢字）<span class="text-red-500"> 必須</span></label>
        <div class="flex gap-2">
          <input v-model="form.kanjiLastName" placeholder="山田" class="input" required />
          <input v-model="form.kanjiFirstName" placeholder="太郎" class="input" required />
        </div>
  
        <!-- Child's Name (Kana) -->
        <label class="block mt-4 mb-2">お子様のお名前（かな）<span class="text-red-500"> 必須</span></label>
        <div class="flex gap-2">
          <input v-model="form.kanaLastName" placeholder="やまだ" class="input" required />
          <input v-model="form.kanaFirstName" placeholder="たろう" class="input" required />
        </div>
  
        <!-- Gender -->
        <label class="block mt-4 mb-2">お子様の性別<span class="text-red-500"> 必須</span></label>
        <div class="flex gap-4">
          <label><input type="radio" v-model="form.gender" value="男の子" /> 男の子</label>
          <label><input type="radio" v-model="form.gender" value="女の子" /> 女の子</label>
        </div>
  
        <!-- School Year -->
        <label class="block mt-4 mb-2">お子様の学年<span class="text-red-500"> 必須</span></label>
        <select v-model="form.grade" class="input" @change="checkPreschool">
          <option value="年少未満">年少未満</option>
          <option value="年少">年少</option>
          <option value="年中">年中</option>
          <option value="年長">年長</option>
        </select>
        <p v-if="showTooltip" class="text-sm text-orange-600 mt-1">学年で年少未満を選択時のみ表出</p>
  
        <!-- Age -->
        <label class="block mt-4 mb-2">年齢・月齢<span class="text-red-500"> 必須</span></label>
        <div class="flex gap-2">
          <input v-model.number="form.age" type="number" class="input" placeholder="歳" required />
          <input v-model.number="form.months" type="number" class="input" placeholder="か月" required />
        </div>
  
        <!-- Phone Number -->
        <label class="block mt-4 mb-2">電話番号<span class="text-red-500"> 必須</span></label>
        <input v-model="form.phone" type="tel" class="input" placeholder="03-1234-5678" required />
  
        <!-- Email -->
        <label class="block mt-4 mb-2">メールアドレス<span class="text-red-500"> 必須</span></label>
        <input v-model="form.email" type="email" class="input" placeholder="name@abcdefg.com" required />
  
        <!-- Submit Button -->
        <button type="submit" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">送信</button>
      </form>
    </div>
  </template>
  
  <script>
  import ChildRegistration from "/components/childregistration.vue";
export default {
    name: "freetrial",
    components: {
      ChildRegistration,
    },
    data() {
      return {
        form: {
          kanjiLastName: "",
          kanjiFirstName: "",
          kanaLastName: "",
          kanaFirstName: "",
          gender: "",
          grade: "年少未満",
          age: "",
          months: "",
          phone: "",
          email: "",
        },
        showTooltip: false,
      };
    },
    methods: {
      checkPreschool() {
        this.showTooltip = this.form.grade === "年少未満";
      },
      submitForm() {
        alert("フォームが送信されました！");
      },
    },
  };
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  