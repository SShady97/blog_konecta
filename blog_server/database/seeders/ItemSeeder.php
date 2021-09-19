<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use Illuminate\Support\Str;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item_data = [

            'category_id' => 1,
            'title' => 'Xiaomi MI 11',
            'slug' => Str::slug('Xiaomi MI 11', '-'),
            'text_s' => 'Xiaomi quiso adelantarse a todos y ser la marca que lanzase el primer móvil con el Snapdragon 888 de Qualcomm, uno de los procesadores que veremos con más frecuencia en la gama alta de 2021 de Android.',
            'text_l' => 'En el análisis del Xiaomi Mi 11 hemos probado a fondo a dicho protagonista, viendo qué tal rinde este nuevo procesador y, sobre todo, que ofrece Xiaomi en su (de momento) primera propuesta para ganar en la línea de los buques insignia. Viendo su nomenclatura no parece tanto el sucesor del Xiaomi Mi 10 Pro, sino del Xiaomi Mi 10. De hecho, aunque veamos en la tabla de a continuación muchas de las especificaciones que esperaríamos de un móvil de primera línea en Android durante este año, también vemos hueco para que haya quizás una versión superior. Pero por ahora veamos qué ofrece este interesante móvil.',
            'image' => 'https://www.notebookcheck.org/uploads/tx_nbc2/XiaomiMi11Pro.jpg'
            
        ];
        $item = new Item($item_data);
        $item->save();

        $item_data = [

            'category_id' => 2,
            'title' => 'Lenovo Legion 5',
            'slug' => Str::slug('Lenovo Legion 5', '-'),
            'text_s' => 'Triunfa gracias a las laptops para juegos Lenovo Legion de la Serie 5. Estas PCs se han diseñado con una gran cantidad de opciones de alto rendimiento, manteniendo a la vez un perfil bajo con un aspecto limpio y minimalista que complementa tu estilo de vida.',
            'text_l' => 'Observa cada detalle y ejercita los reflejos sobrehumanos con pantallas FHD con frame rates de hasta 144 Hz, brillo de hasta 500 nits y hasta sRGB al 100%. También disfrutarás de un sonido envolvente con los sistemas de altavoces Harman Kardon® y compatibilidad con los auriculares Dolby Atmos® para un sonido 3D y máxima conciencia situacional.
                            Golpea fuerte y con mano firme con el teclado Legion TrueStrike. Incorporado en todas las laptops Lenovo Legion de la Serie 5, este teclado para juegos se ha fabricado para auténticos competidores, con una distancia de desplazamiento entre las teclas de 1,5 mm, teclas de dirección extragrandes, retroiluminación total y mucho más para tener un control supremo. Y con Coldfront 2.0, tu CPU y GPU se enfriarán a la temperatura óptima, no importa bajo cuánta presión estén.',
            'image' => 'https://i2.wp.com/laptopmedia.com/wp-content/uploads/2021/04/lenovo_legion_5.jpg?fit=1000%2C563&ssl=1'
            
        ];
        $item = new Item($item_data);
        $item->save();

        $item_data = [

            'category_id' => 1,
            'title' => 'Iphone 12 Pro Max',
            'slug' => Str::slug('Iphone 12 Pro Max', '-'),
            'text_s' => 'Un móvil que comparte mucho más que nomenclatura con el iPhone 12 Pro: su ficha técnica es casi un calco salvo por las dimensiones y sutiles diferencias en pantalla y cámara.',
            'text_l' => 'Como ya comentamos en su presentación y sobre todo al hablar del iPhone 12 Pro, el principal cambio en los iPhone 12 es que se vuelve al borde plano y se dice adiós al lateral semicilíndrico. Algo que estéticamente puede gustar más o menos, pero que resulta una vuelta a los (casi) orígenes del producto, cuando se pasó a este diseño de los bordes en el iPhone 4. Las cámaras traseras mantienen el esquema en triángulo, intercalando el flash y el LiDAR en ese módulo cuadrado con bordes curvos. Yendo al detalle, los cristales de las lentes del iPhone 12 Pro Max sobresalen algo más de su marco metálico que en el iPhone 12 Pro.',
            'image' => 'https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/11/DSC03230-scaled.jpg?fit=1200%2C800&ssl=1'
            
        ];
        $item = new Item($item_data);
        $item->save();

        $item_data = [

            'category_id' => 2,
            'title' => 'Acer nitro 7',
            'slug' => Str::slug('Acer nitro 7', '-'),
            'text_s' => 'La laptop que tenemos aquí es el modelo AN715-51-78PN y cuenta con un procesador IntelCore i7 de novena generación, una tarjeta gráfica Nvidia GeForce GTX 1660Ti y 16GB de RAM expandible a 32GB. El sistema operativo es Windows 10 Home.',
            'text_l' => 'La pantalla es de 15.6 pulgadas FullHD con cuerpo metálico de 19,9 mm de grosor y una relación de pantalla-cuerpo de 78%. Respecto al almacenamiento, hablamos de 256GB SSD y la autonomía es de siete horas en uso a nivel usuario.
                            Y si hablamos de accesibilidad, la Acer Nitro 7 cuenta con tres puertos USB, un puerto USB-Tipo C y un punto de entrada HDMI. El peso total del equipo es de aproximadamente 2.50 kilos.
                            Acer no se equivoca al decir que la laptop está dedicada para los gamers ocasionales que buscan dar un salto de calidad. Por ejemplo, el codificador Open Broadcaster Software (OBS) hace posible la transmisión vía Twitch y Youtube de manera simultánea sin perder calidad.
                            Para ser liviana, el calor generado por la Nitro 7 es aceptable. Igual calienta como cualquier otra laptop gamer, pero sorprende que, aún con su grosor liviano, mantenga la misma frescura que la competencia.',
            'image' => 'https://i.pcmag.com/imagery/reviews/01lZhhYPvqPINSPBUNI4wBB-7.fit_lim.size_810x456.v_1569469962.jpg'
            
        ];
        $item = new Item($item_data);
        $item->save();

        $item_data = [

            'category_id' => 3,
            'title' => 'Samsung RU7300 UHD 4K Smart Curvo',
            'slug' => Str::slug('Samsung RU7300 UHD 4K Smart Curvo', '-'),
            'text_s' => 'Disfruta de imágenes definidas y nítidas con el televisor 4K UHD que tiene 4 veces más píxeles que el televisor FHD. Ahora puedes ver hasta los detalles más insignificantes de cada escena.',
            'text_l' => 'Disfruta de las imágenes con mejores niveles de color, nitidez y contraste. La atenuación UHD de Samsung divide y procesa la pantalla en pequeños bloques que te permiten captar detalles más precisos.
                            Mira contenido HDR con mejor claridad y expresiones de color en detalle. El televisor Samsung UHD te ofrece detalles más precisos en escenas iluminadas y oscuras.
                            Experimenta otro nivel de visión inmersiva. El potenciador automático de profundidad ajusta los niveles de contraste multicapa para imágenes más reales.
                            Moderno y refinado, el elegante diseño del televisor UHD se adapta de manera natural a los contornos del espacio con un diseño simple.',
            'image' => 'https://images.samsung.com/is/image/samsung/co-feature-get-more-detail--get-more-delight-153466940?$FB_TYPE_A_MO_JPG$'
            
        ];
        $item = new Item($item_data);
        $item->save();

        

    }
}
