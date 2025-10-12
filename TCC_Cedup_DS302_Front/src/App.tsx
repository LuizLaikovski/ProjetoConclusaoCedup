import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {

  useEffect(() =>{
    AOS.init({
      // Global settings:
      disable: false, // aceita os seguintes valores: 'phone', 'tablet', 'mobile', booleano, expressão ou função
      startEvent: 'DOMContentLoaded', // nome do evento disparado no documento que deve inicializar o AOS
      initClassName: 'aos-init', // classe aplicada após a inicialização
      animatedClassName: 'aos-animate', // classe aplicada durante a animação
      useClassNames: true, // se true, adicionará o conteúdo de `data-aos` como classes durante o scroll
      disableMutationObserver: false, // desativa a detecção automática de mutações (avançado)
      debounceDelay: 50, // atraso no debounce usado durante o redimensionamento da janela (avançado)
      throttleDelay: 99, // atraso no throttle usado durante a rolagem da página (avançado)

      // Configurações que podem ser sobrescritas por elemento, via atributos `data-aos-*`:
      offset: 120, // deslocamento (em px) do ponto de trigger original
      delay: 0, // valores de 0 a 3000, com incrementos de 50ms
      duration: 400, // valores de 0 a 3000, com incrementos de 50ms
      easing: 'ease-in-out', // easing padrão para as animações do AOS
      once: false, // se a animação deve ocorrer apenas uma vez - durante a rolagem para baixo
      mirror: true, // se os elementos devem animar ao sair da tela durante a rolagem
      anchorPlacement: 'top-bottom', // define qual posição do elemento em relação à janela deve acionar a animação

    });

    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
      el.setAttribute('data-aos', 'fade-up');
    })
  }, []);

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>  
        <Outlet />
      </div>
    </>
  )
}

export default App