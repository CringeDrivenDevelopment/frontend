<template>
  <div class="flex justify-center flex-wrap w-full text-white gap-3 py-3">
    <div class="w-full font-medium text-2xl">В плейлисте</div>
    <div class="flex flex-wrap gap-2">
      <Track v-for="track in tracks" :key="track.id" :track="track" mode="accepted" />
    </div>
    <div class="w-full font-medium text-2xl">На модерации</div>
    <div class="flex flex-wrap gap-2">
      <Track v-for="track in tracks" :key="track.id" :track="track" mode="moderation" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const tracks = [
  {
    id: "_V0CbWuz4SM",
    title: "СИГНАЛ",
    authors: "Toxi$, OG Buda",
    thumbnail:
      "https://lh3.googleusercontent.com/wEzVNTGS8CN931rGVzoby2YRjObVWsVbv6bVzZAYV0huq7oI6zW8LCSY9_8of3mAzKtyoCsLjl4ujjjP=w60-h60-l90-rj",
    length: 248,
    explicit: true,
  },
  {
    id: "q5BzKmsmnd4",
    title: "I GOT U fffffffffffffffffffffffffffffffffffff",
    authors: "Toxi$",
    thumbnail:
      "https://lh3.googleusercontent.com/MuZOlN5RGWEGkYIZjb5ujUXLrX0QPVk4ZMyCUsQ9Qqdk4zpc7zl82w9px0Cbi7lvJ_oVUlbr7Vzt4ogY=w60-h60-l90-rj",
    length: 164,
    explicit: true,
  },
  {
    id: "C2AALdvtXbI",
    title: "NOTHING",
    authors: "Toxi$",
    thumbnail:
      "https://lh3.googleusercontent.com/z5fjJNS93H5DKtajfPOt9_BU4LjQqKiCEKtL-riUcnUkQDP2sz8FXKszwALaW09jaqgPhGyO1O5PY6s=w60-h60-l90-rj",
    length: 145,
    explicit: false,
  },
  {
    id: "lnW4XCIGKhE",
    title: "TOXIC (feat. Rema)",
    authors: "Hamza",
    thumbnail:
      "https://lh3.googleusercontent.com/_JCoojcrwr4RqlqQeQtGaz3RC02cdQ-I7wngJk0J4t6XHJoqFsCaz4G5_1H1MKxPvVD8poC4-zMUuB-p=w60-h60-l90-rj",
    length: 161,
    explicit: true,
  },
  {
    id: "uWajuebX93s",
    title: "HURTZ",
    authors: "Toxi$",
    thumbnail:
      "https://lh3.googleusercontent.com/bdCI907nnXjh58ryF83eOEmoEQMVfgy-8oP6YBLl2N6LfZ8RUlo3uAZYK-F6UDVMbA0Zp6GlDSngqBcq=w60-h60-l90-rj",
    length: 105,
    explicit: true,
  },
];
</script>

<style></style>
