<template>
  <footer class="bg-white" aria-labelledby="footer-heading">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      
      <div class="mt-8 border-t border-gray-200 pt-8 items-center">
        <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; {{ currentYear }} <br>
          <a href='https://github.com/victorhe33'>victorhe33</a> &nbsp;&nbsp;&nbsp;&nbsp; 
          <a href='https://github.com/andreiaugustin'>andreiaugustin</a> &nbsp;&nbsp;&nbsp;&nbsp;
          <a href='https://github.com/MasterChief-kun'>MasterChief-kun</a>
        </p>
      </div>

    </div>
  </footer>
</template>

<script>
const date = new Date();
const currentYear = date.getFullYear();
export default {
  setup () {
    return {
      currentYear
    }
  }
}
</script>
