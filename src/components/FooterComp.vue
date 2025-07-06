<template>
  <footer class="footer">
    <p>&copy; 2025 My Steam App</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1b2838; /* ネイビー背景色 */
  color: #c7d5e0; /* 明るいブルーグレー */
  padding: 12px;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
}

/* --- Responsive Design --- */
@media (max-width: 960px) {
  .footer {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .footer {
    font-size: 0.7rem;
  }
}
</style>
