<template>
  <nb-alert title="success" type="success"></nb-alert>
  <nb-alert title="info" type="info"></nb-alert>
  <nb-alert title="error" type="error"></nb-alert>
  <nb-alert title="warning" type="warning"></nb-alert>
  <nb-alert title="warning" type="warning" :closeable="false"></nb-alert>
  <nb-alert title="success" type="success" center></nb-alert>
</template>

<style scoped>
.nb-alert {
  margin: 6px;
}
</style>