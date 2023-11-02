const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCw05fUBPwmpu-ehXFMqfdMw&part=snippet%2Cid&order=date&maxResults=18';

const content = null || document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '252c9efe9amsh4e9a262ee7a7160p15f7f1jsn1674570d2f29',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};
//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options); //Esperar la petición, options es la key que nos entrega rapiApi
    const data = await response.json(); //Transformar la información a objeto json el cual podemos iterar o manejar
    return data;//retorna la información de la API que estamos solicitando
}

//function que se llama asi misma, para traer los datos de la api 
//Function anonima autoejecutable
(async () => {
    try {
        const videos = await fetchData(API);
        //Concatenando para iterar cada video
        //Metodo .map devuelve un nuevo arreglo con la tranformación que se esta aplicando con los templates a cada uno de los videos
        //LLamar solo 4 videos con el mnetodo slice
        let view = `
        ${videos.items.map(video => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
        <div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
        <img 
        src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
    </div>
    <div class="mt-4 flex justify-between">
      <h3 class="text-sm text-gray-700">
        <span aria-hidden="true" class="absolute inset-0"></span>
        ${video.snippet.title}
      </h3>
    </div>
  </div>
        `).slice(0,18).join('')} 
      `;
    content.innerHTML = view;

    } catch (error) {
   console.log(error);
    }
})();