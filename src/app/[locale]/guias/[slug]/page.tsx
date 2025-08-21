'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  MessageCircle, 
  ChevronRight, 
  Shield, 
  CreditCard, 
  Gift, 
  AlertTriangle, 
  CheckCircle2,
  Star,
  Eye,
  FileText,
  Smartphone,
  Globe,
  Lock,
  HelpCircle,
  TrendingUp,
  Heart,
  Target,
  Zap,
  Award,
  Settings,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Comprehensive guide data
const guidesData = {
  'como-elegir-mejor-casino-online-2024': {
    id: 'como-elegir-mejor-casino-online-2024',
    title: 'Cómo Elegir el Mejor Casino Online en 2024',
    subtitle: 'Guía completa para elegir un casino online seguro y confiable',
    category: 'Principiantes',
    readTime: '12 min',
    author: {
      name: 'Carlos Mendoza',
      role: 'Experto en Casinos Online',
      avatar: '👨‍💼'
    },
    publishDate: '2024-01-15',
    lastUpdate: '2024-08-21',
    image: '🎰',
    difficulty: 'Fácil',
    views: 15432,
    likes: 289,
    tags: ['Casinos', 'Seguridad', 'Principiantes', 'Guía', 'México'],
    tableOfContents: [
      { id: 'introduccion', title: 'Introducción', level: 2 },
      { id: 'factores-clave', title: 'Factores Clave a Considerar', level: 2 },
      { id: 'licencias-regulacion', title: '1. Licencias y Regulación', level: 3 },
      { id: 'seguridad-proteccion', title: '2. Seguridad y Protección', level: 3 },
      { id: 'variedad-juegos', title: '3. Variedad de Juegos', level: 3 },
      { id: 'bonos-promociones', title: '4. Bonos y Promociones', level: 3 },
      { id: 'metodos-pago', title: '5. Métodos de Pago', level: 3 },
      { id: 'atencion-cliente', title: '6. Atención al Cliente', level: 3 },
      { id: 'verificar-licencias', title: 'Cómo Verificar Licencias', level: 2 },
      { id: 'entender-bonos', title: 'Entender los Bonos', level: 2 },
      { id: 'banderas-rojas', title: 'Banderas Rojas a Evitar', level: 2 },
      { id: 'guia-registro', title: 'Guía Paso a Paso para Registrarse', level: 2 },
      { id: 'juego-responsable', title: 'Juego Responsable', level: 2 },
      { id: 'preguntas-frecuentes', title: 'Preguntas Frecuentes', level: 2 },
      { id: 'conclusion', title: 'Conclusión', level: 2 }
    ],
    content: `
      <div id="introduccion" class="section">
        <h2 class="section-title">Introducción</h2>
        <p class="lead">La industria de los casinos online ha experimentado un crecimiento extraordinario en los últimos años, especialmente en México. Con cientos de plataformas disponibles, elegir el casino online correcto puede ser abrumador para los jugadores, especialmente para aquellos que recién comienzan.</p>
        
        <p>Esta guía completa te proporcionará todas las herramientas y conocimientos necesarios para tomar una decisión informada al elegir un casino online. Cubriremos desde los aspectos más básicos hasta los detalles técnicos que marcan la diferencia entre una experiencia de juego excelente y una decepcionante.</p>
        
        <div class="highlight-box success">
          <div class="flex items-start gap-3">
            <div class="text-green-600 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div>
            <div>
              <h4>¿Por qué es importante esta guía?</h4>
              <p>Elegir el casino correcto no solo afecta tu experiencia de juego, sino también la seguridad de tu dinero y datos personales. Una mala elección puede resultar en pérdidas financieras y problemas legales.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="factores-clave" class="section">
        <h2 class="section-title">Factores Clave a Considerar</h2>
        <p>Antes de registrarte en cualquier casino online, hay varios factores críticos que debes evaluar. Estos elementos determinarán no solo tu seguridad, sino también la calidad de tu experiencia de juego.</p>
        
        <div class="factors-grid">
          <div class="factor-card">
            <div class="factor-icon">🛡️</div>
            <h4>Licencias y Regulación</h4>
            <p>Verificación de autoridades de juego legítimas</p>
          </div>
          <div class="factor-card">
            <div class="factor-icon">🔒</div>
            <h4>Seguridad</h4>
            <p>Encriptación SSL y protección de datos</p>
          </div>
          <div class="factor-card">
            <div class="factor-icon">🎮</div>
            <h4>Variedad de Juegos</h4>
            <p>Catálogo amplio de proveedores reconocidos</p>
          </div>
          <div class="factor-card">
            <div class="factor-icon">💰</div>
            <h4>Bonos Justos</h4>
            <p>Promociones con términos transparentes</p>
          </div>
          <div class="factor-card">
            <div class="factor-icon">💳</div>
            <h4>Métodos de Pago</h4>
            <p>Opciones seguras y convenientes</p>
          </div>
          <div class="factor-card">
            <div class="factor-icon">🎧</div>
            <h4>Soporte 24/7</h4>
            <p>Atención al cliente eficiente</p>
          </div>
        </div>
      </div>

      <div id="licencias-regulacion" class="section">
        <h3 class="subsection-title">1. Licencias y Regulación</h3>
        <p>La licencia es el indicador más importante de la legitimidad de un casino online. Un casino con licencia está sujeto a regulaciones estrictas que protegen a los jugadores.</p>
        
        <h4>Autoridades de Licenciamiento Reconocidas:</h4>
        <div class="license-grid">
          <div class="license-card">
            <h5>🇲🇹 Malta Gaming Authority (MGA)</h5>
            <p>Una de las licencias más respetadas en Europa. Regulación estricta y protección al jugador.</p>
          </div>
          <div class="license-card">
            <h5>🇬🇧 UK Gambling Commission (UKGC)</h5>
            <p>Estándares extremadamente altos para operadores. Ideal para jugadores británicos.</p>
          </div>
          <div class="license-card">
            <h5>🇨🇼 Curaçao eGaming</h5>
            <p>Licencia popular y accesible. Buena regulación para mercados internacionales.</p>
          </div>
          <div class="license-card">
            <h5>🇬🇮 Gibraltar Regulatory Authority</h5>
            <p>Regulación sólida con focus en transparencia y fairness.</p>
          </div>
        </div>

        <div class="warning-box">
          <div class="flex items-start gap-3">
            <div class="text-amber-600 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div>
            <div>
              <h4>⚠️ Evita Casinos Sin Licencia</h4>
              <p>Nunca juegues en casinos que no muestren claramente su información de licencia. Estos sitios pueden ser fraudulentos y podrías perder tu dinero sin recurso legal.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="seguridad-proteccion" class="section">
        <h3 class="subsection-title">2. Seguridad y Protección</h3>
        <p>La seguridad de tus datos personales y transacciones financieras debe ser una prioridad absoluta al elegir un casino online.</p>
        
        <h4>Elementos de Seguridad Esenciales:</h4>
        <ul class="security-checklist">
          <li><span class="checkmark">✅</span> <strong>Encriptación SSL 256-bit:</strong> Protege toda la información transmitida</li>
          <li><span class="checkmark">✅</span> <strong>Certificados de Seguridad:</strong> Verificados por autoridades como VeriSign o Thawte</li>
          <li><span class="checkmark">✅</span> <strong>Auditorías de Terceros:</strong> Realizadas por empresas como eCOGRA o iTech Labs</li>
          <li><span class="checkmark">✅</span> <strong>Generadores de Números Aleatorios (RNG):</strong> Certificados para garantizar juegos justos</li>
          <li><span class="checkmark">✅</span> <strong>Políticas de Privacidad Claras:</strong> Transparencia sobre el uso de datos</li>
        </ul>

        <div class="info-box">
          <h4>🔍 Cómo Verificar la Seguridad</h4>
          <ol>
            <li>Busca el candado en la barra de direcciones del navegador</li>
            <li>Verifica que la URL comience con "https://"</li>
            <li>Revisa los certificados de seguridad en el footer del sitio</li>
            <li>Busca sellos de empresas auditoras reconocidas</li>
          </ol>
        </div>
      </div>

      <div id="variedad-juegos" class="section">
        <h3 class="subsection-title">3. Variedad de Juegos</h3>
        <p>Un buen casino online debe ofrecer una amplia selección de juegos de proveedores reconocidos mundialmente.</p>
        
        <h4>Categorías de Juegos Importantes:</h4>
        
        <div class="games-category">
          <h5>🎰 Tragamonedas (Slots)</h5>
          <ul>
            <li><strong>Clásicas:</strong> 3 rodillos, estilo retro</li>
            <li><strong>Video Slots:</strong> 5+ rodillos, múltiples líneas de pago</li>
            <li><strong>Jackpots Progresivos:</strong> Premios millonarios acumulativos</li>
            <li><strong>Megaways:</strong> Hasta 117,649 formas de ganar</li>
          </ul>
        </div>

        <div class="games-category">
          <h5>🃏 Juegos de Mesa</h5>
          <ul>
            <li><strong>Blackjack:</strong> Múltiples variantes (Americano, Europeo, Atlantic City)</li>
            <li><strong>Ruleta:</strong> Francesa, Americana, Europea</li>
            <li><strong>Baccarat:</strong> Punto Banco, Chemin de Fer</li>
            <li><strong>Poker:</strong> Caribbean, Texas Hold'em, Three Card</li>
          </ul>
        </div>

        <div class="games-category">
          <h5>🎥 Casino en Vivo</h5>
          <ul>
            <li>Crupieres reales en tiempo real</li>
            <li>Estudios profesionales de transmisión</li>
            <li>Interacción por chat en vivo</li>
            <li>Mesas en múltiples idiomas</li>
          </ul>
        </div>

        <h4>Proveedores de Software Reconocidos:</h4>
        <div class="providers-grid">
          <div class="provider-tag">Microgaming</div>
          <div class="provider-tag">NetEnt</div>
          <div class="provider-tag">Playtech</div>
          <div class="provider-tag">Evolution Gaming</div>
          <div class="provider-tag">Pragmatic Play</div>
          <div class="provider-tag">IGT</div>
          <div class="provider-tag">Betsoft</div>
          <div class="provider-tag">Red Tiger</div>
        </div>
      </div>

      <div id="bonos-promociones" class="section">
        <h3 class="subsection-title">4. Bonos y Promociones</h3>
        <p>Los bonos pueden aumentar significativamente tu bankroll inicial, pero es crucial entender sus términos y condiciones antes de reclamarlos.</p>
        
        <h4>Tipos de Bonos Comunes:</h4>
        
        <div class="bonus-type">
          <h5>🎁 Bono de Bienvenida</h5>
          <p>Generalmente un porcentaje de match en tu primer depósito (ej: 100% hasta $5,000 MXN)</p>
          <div class="bonus-details">
            <span class="pro">✅ Duplica tu primer depósito</span>
            <span class="con">❌ Requiere cumplir rollover</span>
          </div>
        </div>

        <div class="bonus-type">
          <h5>🆓 Tiradas Gratis (Free Spins)</h5>
          <p>Giros gratuitos en tragamonedas específicas</p>
          <div class="bonus-details">
            <span class="pro">✅ Sin riesgo de pérdida</span>
            <span class="con">❌ Limitado a juegos específicos</span>
          </div>
        </div>

        <div class="bonus-type">
          <h5>💰 Bono Sin Depósito</h5>
          <p>Crédito gratuito para probar el casino sin depositar</p>
          <div class="bonus-details">
            <span class="pro">✅ Sin riesgo financiero</span>
            <span class="con">❌ Montos pequeños y rollover alto</span>
          </div>
        </div>

        <div class="important-terms">
          <h4>📋 Términos Importantes a Verificar</h4>
          <ul>
            <li><strong>Rollover/Wagering:</strong> Cuántas veces debes apostar el bono antes de retirar</li>
            <li><strong>Juegos Contribuyentes:</strong> Qué juegos cuentan para cumplir el rollover</li>
            <li><strong>Límite de Tiempo:</strong> Plazo para cumplir los requisitos</li>
            <li><strong>Apuesta Máxima:</strong> Límite por giro/mano mientras juegas con bono</li>
            <li><strong>Retiro Máximo:</strong> Cantidad máxima que puedes retirar de ganancias del bono</li>
          </ul>
        </div>
      </div>

      <div id="metodos-pago" class="section">
        <h3 class="subsection-title">5. Métodos de Pago</h3>
        <p>Para jugadores mexicanos, es esencial que el casino ofrezca métodos de pago convenientes, seguros y con procesamiento rápido.</p>
        
        <h4>Métodos Recomendados para México:</h4>
        
        <div class="payment-methods">
          <div class="payment-category">
            <h5>💳 Tarjetas de Crédito/Débito</h5>
            <ul>
              <li><strong>Visa:</strong> Amplia aceptación, procesamiento instantáneo</li>
              <li><strong>Mastercard:</strong> Excelente seguridad, disponible globalmente</li>
              <li><strong>American Express:</strong> Menos aceptada pero muy segura</li>
            </ul>
            <div class="payment-info">
              <span class="speed">⚡ Depósitos: Instantáneos</span>
              <span class="speed">⏱️ Retiros: 3-5 días hábiles</span>
            </div>
          </div>

          <div class="payment-category">
            <h5>🏦 Transferencias Bancarias</h5>
            <ul>
              <li><strong>SPEI:</strong> Sistema mexicano de pagos electrónicos</li>
              <li><strong>Wire Transfer:</strong> Transferencias internacionales</li>
            </ul>
            <div class="payment-info">
              <span class="speed">⚡ Depósitos: 1-24 horas</span>
              <span class="speed">⏱️ Retiros: 3-7 días hábiles</span>
            </div>
          </div>

          <div class="payment-category">
            <h5>💼 Monederos Electrónicos</h5>
            <ul>
              <li><strong>PayPal:</strong> Muy seguro, amplia aceptación</li>
              <li><strong>Skrill:</strong> Popular en casinos online</li>
              <li><strong>Neteller:</strong> Especializado en juegos online</li>
              <li><strong>ecoPayz:</strong> Buenas tarifas para México</li>
            </ul>
            <div class="payment-info">
              <span class="speed">⚡ Depósitos: Instantáneos</span>
              <span class="speed">⏱️ Retiros: 24-48 horas</span>
            </div>
          </div>

          <div class="payment-category">
            <h5>🏪 Métodos Locales México</h5>
            <ul>
              <li><strong>OXXO:</strong> Pago en efectivo en tiendas</li>
              <li><strong>Bancomer Transfer:</strong> Transferencia bancaria local</li>
              <li><strong>Santander:</strong> Depósitos bancarios directos</li>
            </ul>
            <div class="payment-info">
              <span class="speed">⚡ Depósitos: 1-4 horas</span>
              <span class="speed">⏱️ Retiros: Vía otros métodos</span>
            </div>
          </div>

          <div class="payment-category">
            <h5>₿ Criptomonedas (Opcional)</h5>
            <ul>
              <li><strong>Bitcoin:</strong> Anónimo y seguro</li>
              <li><strong>Ethereum:</strong> Transacciones rápidas</li>
              <li><strong>Litecoin:</strong> Tarifas bajas</li>
            </ul>
            <div class="payment-info">
              <span class="speed">⚡ Depósitos: 10-60 minutos</span>
              <span class="speed">⏱️ Retiros: 1-6 horas</span>
            </div>
          </div>
        </div>

        <div class="payment-tips">
          <h4>💡 Consejos para Pagos Seguros</h4>
          <ul>
            <li>Verifica las tarifas de transacción antes de depositar</li>
            <li>Usa el mismo método para depósitos y retiros cuando sea posible</li>
            <li>Guarda todos los comprobantes de transacción</li>
            <li>Verifica los límites mínimos y máximos de cada método</li>
          </ul>
        </div>
      </div>

      <div id="atencion-cliente" class="section">
        <h3 class="subsection-title">6. Atención al Cliente</h3>
        <p>Un soporte al cliente eficiente y accesible es crucial, especialmente cuando surgen problemas con depósitos, retiros o cuentas.</p>
        
        <h4>Canales de Soporte Ideales:</h4>
        
        <div class="support-channels">
          <div class="support-channel">
            <div class="channel-icon">💬</div>
            <h5>Chat en Vivo</h5>
            <ul>
              <li>Disponible 24/7</li>
              <li>Respuesta inmediata</li>
              <li>Soporte en español</li>
              <li>Agentes capacitados</li>
            </ul>
          </div>

          <div class="support-channel">
            <div class="channel-icon">📧</div>
            <h5>Correo Electrónico</h5>
            <ul>
              <li>Para consultas detalladas</li>
              <li>Respuesta en 24-48 horas</li>
              <li>Documentación escrita</li>
              <li>Múltiples idiomas</li>
            </ul>
          </div>

          <div class="support-channel">
            <div class="channel-icon">📞</div>
            <h5>Teléfono</h5>
            <ul>
              <li>Para problemas urgentes</li>
              <li>Número gratuito o local</li>
              <li>Horarios extendidos</li>
              <li>Soporte personalizado</li>
            </ul>
          </div>

          <div class="support-channel">
            <div class="channel-icon">❓</div>
            <h5>Centro de Ayuda</h5>
            <ul>
              <li>FAQs comprehensivas</li>
              <li>Guías paso a paso</li>
              <li>Búsqueda inteligente</li>
              <li>Actualización regular</li>
            </ul>
          </div>
        </div>

        <div class="support-quality">
          <h4>🏆 Indicadores de Soporte de Calidad</h4>
          <ul>
            <li><strong>Tiempo de Respuesta:</strong> Chat <2 minutos, Email <24 horas</li>
            <li><strong>Competencia:</strong> Agentes con conocimiento técnico</li>
            <li><strong>Profesionalismo:</strong> Trato cortés y soluciones efectivas</li>
            <li><strong>Seguimiento:</strong> Verifican que el problema se resolvió</li>
          </ul>
        </div>
      </div>

      <div id="verificar-licencias" class="section">
        <h2 class="section-title">Cómo Verificar Licencias</h2>
        <p>Verificar la legitimidad de una licencia es un paso crucial que muchos jugadores pasan por alto. Aquí te mostramos cómo hacerlo correctamente.</p>
        
        <div class="verification-steps">
          <h4>📝 Pasos para Verificar una Licencia</h4>
          
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h5>Busca la Información de Licencia</h5>
              <p>Generalmente se encuentra en el footer del sitio web del casino. Debe incluir:</p>
              <ul>
                <li>Nombre de la autoridad reguladora</li>
                <li>Número de licencia</li>
                <li>Fecha de emisión y vencimiento</li>
                <li>Enlace al sitio web del regulador</li>
              </ul>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h5>Verifica en el Sitio del Regulador</h5>
              <p>Visita el sitio web oficial de la autoridad y busca:</p>
              <ul>
                <li>Base de datos de licencias activas</li>
                <li>Herramienta de verificación de licencias</li>
                <li>Lista de operadores autorizados</li>
              </ul>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h5>Verifica la Información</h5>
              <p>Confirma que los datos coincidan exactamente:</p>
              <ul>
                <li>Nombre de la empresa</li>
                <li>Número de licencia</li>
                <li>Estado de la licencia (activa)</li>
                <li>Servicios autorizados</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="regulatory-links">
          <h4>🔗 Enlaces de Verificación Oficiales</h4>
          <ul>
            <li><strong>Malta Gaming Authority:</strong> mga.org.mt/verify-license/</li>
            <li><strong>UK Gambling Commission:</strong> secure.gamblingcommission.gov.uk</li>
            <li><strong>Curaçao eGaming:</strong> e-gaming.cw/licensees</li>
            <li><strong>Gibraltar:</strong> gibraltarlaws.gov.gi/gambling</li>
          </ul>
        </div>
      </div>

      <div id="entender-bonos" class="section">
        <h2 class="section-title">Entender los Bonos y Requisitos de Apuesta</h2>
        <p>Los bonos de casino pueden ser muy beneficiosos, pero también pueden ser trampas si no entiendes completamente sus términos.</p>
        
        <div class="bonus-calculator">
          <h4>🧮 Calculadora de Rollover</h4>
          <p>Ejemplo práctico de cálculo de rollover:</p>
          
          <div class="calculation-example">
            <div class="calc-item">
              <span class="label">Bono recibido:</span>
              <span class="value">$2,000 MXN</span>
            </div>
            <div class="calc-item">
              <span class="label">Rollover requerido:</span>
              <span class="value">35x</span>
            </div>
            <div class="calc-item total">
              <span class="label">Total a apostar:</span>
              <span class="value">$70,000 MXN</span>
            </div>
          </div>
          
          <p class="calc-note">Esto significa que debes apostar $70,000 antes de poder retirar cualquier ganancia del bono.</p>
        </div>

        <h4>📊 Contribución de Juegos al Rollover</h4>
        <div class="game-contribution">
          <div class="contribution-item">
            <span class="game">Tragamonedas</span>
            <span class="percentage">100%</span>
          </div>
          <div class="contribution-item">
            <span class="game">Blackjack</span>
            <span class="percentage">10%</span>
          </div>
          <div class="contribution-item">
            <span class="game">Ruleta</span>
            <span class="percentage">20%</span>
          </div>
          <div class="contribution-item">
            <span class="game">Video Poker</span>
            <span class="percentage">25%</span>
          </div>
          <div class="contribution-item">
            <span class="game">Baccarat</span>
            <span class="percentage">0%</span>
          </div>
        </div>

        <div class="bonus-strategy">
          <h4>🎯 Estrategia para Maximizar Bonos</h4>
          <ol>
            <li><strong>Lee todos los términos</strong> antes de reclamar cualquier bono</li>
            <li><strong>Calcula el rollover total</strong> y evalúa si es realista</li>
            <li><strong>Elige juegos</strong> que contribuyan 100% al rollover</li>
            <li><strong>Gestiona tu bankroll</strong> para cumplir los requisitos</li>
            <li><strong>Respeta los límites de apuesta</strong> para evitar anulación</li>
          </ol>
        </div>
      </div>

      <div id="banderas-rojas" class="section">
        <h2 class="section-title">Banderas Rojas: Señales de Advertencia</h2>
        <p>Aprende a identificar las señales que indican que debes evitar un casino específico.</p>
        
        <div class="red-flags">
          <div class="red-flag">
            <div class="flag-icon">🚩</div>
            <div class="flag-content">
              <h5>Sin Licencia Válida</h5>
              <p>No muestra información de licencia o la licencia no puede ser verificada en el sitio del regulador.</p>
            </div>
          </div>

          <div class="red-flag">
            <div class="flag-icon">🚩</div>
            <div class="flag-content">
              <h5>Términos de Bono Imposibles</h5>
              <p>Rollover superior a 50x, límites de tiempo irrealmente cortos, o restricciones excesivas en juegos.</p>
            </div>
          </div>

          <div class="red-flag">
            <div class="flag-icon">🚩</div>
            <div class="flag-content">
              <h5>Quejas Frecuentes de Jugadores</h5>
              <p>Múltiples reportes sobre retiros denegados, confiscación de ganancias, o cuentas cerradas arbitrariamente.</p>
            </div>
          </div>

          <div class="red-flag">
            <div class="flag-icon">🚩</div>
            <div class="flag-content">
              <h5>Soporte al Cliente Deficiente</h5>
              <p>No responden a consultas, chat en vivo inexistente, o agentes que no pueden resolver problemas básicos.</p>
            </div>
          </div>

          <div class="red-flag">
            <div class="flag-icon">🚩</div>
            <div class="flag-content">
              <h5>Información de Contacto Limitada</h5>
              <p>Solo email de contacto, sin teléfono ni chat en vivo, o información de empresa no verificable.</p>
            </div>
          </div>

          <div class="red-flag">
            <div class="flag-icon">🚩</div>
            <div class="flag-content">
              <h5>Procesos de Verificación Excesivos</h5>
              <p>Solicitan documentación excesiva o información irrelevante para procesar retiros.</p>
            </div>
          </div>
        </div>

        <div class="protection-tips">
          <h4>🛡️ Cómo Protegerte</h4>
          <ul>
            <li><strong>Investiga antes de depositar:</strong> Lee reseñas y busca experiencias de otros jugadores</li>
            <li><strong>Empieza con depósitos pequeños:</strong> Prueba el servicio antes de invertir grandes cantidades</li>
            <li><strong>Documenta todo:</strong> Guarda capturas de pantalla y correos importantes</li>
            <li><strong>Conoce tus derechos:</strong> Familiarízate con las regulaciones aplicables</li>
          </ul>
        </div>
      </div>

      <div id="guia-registro" class="section">
        <h2 class="section-title">Guía Paso a Paso para Registrarse</h2>
        <p>Una vez que hayas elegido tu casino, sigue estos pasos para un registro exitoso y seguro.</p>
        
        <div class="registration-steps">
          <div class="reg-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h5>Preparación de Documentos</h5>
              <p>Antes de registrarte, ten listos:</p>
              <ul>
                <li>Identificación oficial (INE, pasaporte)</li>
                <li>Comprobante de domicilio (no mayor a 3 meses)</li>
                <li>Método de pago a utilizar</li>
                <li>Dirección de correo electrónico válida</li>
              </ul>
            </div>
          </div>

          <div class="reg-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h5>Proceso de Registro</h5>
              <ul>
                <li>Haz clic en "Registrarse" o "Crear Cuenta"</li>
                <li>Completa el formulario con información precisa</li>
                <li>Utiliza una contraseña fuerte y única</li>
                <li>Verifica tu dirección de correo electrónico</li>
              </ul>
            </div>
          </div>

          <div class="reg-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h5>Verificación de Cuenta</h5>
              <ul>
                <li>Sube los documentos solicitados</li>
                <li>Asegúrate de que las imágenes sean claras</li>
                <li>Espera la confirmación del casino (24-72 horas)</li>
                <li>Proporciona información adicional si es necesaria</li>
              </ul>
            </div>
          </div>

          <div class="reg-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h5>Primer Depósito</h5>
              <ul>
                <li>Ve a la sección de "Cajero" o "Depósito"</li>
                <li>Elige tu método de pago preferido</li>
                <li>Ingresa el monto (considera bonos disponibles)</li>
                <li>Confirma la transacción</li>
              </ul>
            </div>
          </div>

          <div class="reg-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h5>Configuración de Seguridad</h5>
              <ul>
                <li>Activa la autenticación de dos factores (2FA)</li>
                <li>Establece límites de depósito y pérdida</li>
                <li>Revisa la configuración de privacidad</li>
                <li>Guarda la información de contacto del casino</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="registration-tips">
          <h4>💡 Consejos para un Registro Exitoso</h4>
          <ul>
            <li><strong>Información exacta:</strong> Usa los datos que aparecen en tus documentos oficiales</li>
            <li><strong>Una cuenta por persona:</strong> Nunca crees múltiples cuentas</li>
            <li><strong>Lee los términos:</strong> Comprende las reglas antes de aceptar</li>
            <li><strong>Guarda confirmaciones:</strong> Conserva todos los emails de confirmación</li>
          </ul>
        </div>
      </div>

      <div id="juego-responsable" class="section">
        <h2 class="section-title">Juego Responsable: Disfruta de Forma Segura</h2>
        <p>El juego debe ser una forma de entretenimiento, nunca una fuente de estrés financiero o personal.</p>
        
        <div class="responsible-gambling">
          <h4>🎯 Principios del Juego Responsable</h4>
          
          <div class="principle">
            <h5>💰 Establece un Presupuesto</h5>
            <ul>
              <li>Define un monto mensual que puedas permitirte perder</li>
              <li>Nunca juegues con dinero destinado a gastos básicos</li>
              <li>Considera el juego como entretenimiento, no como inversión</li>
            </ul>
          </div>

          <div class="principle">
            <h5>⏰ Controla el Tiempo</h5>
            <ul>
              <li>Establece límites de tiempo para cada sesión</li>
              <li>Toma descansos regulares cada hora</li>
              <li>No juegues cuando estés cansado o estresado</li>
            </ul>
          </div>

          <div class="principle">
            <h5>🧠 Mantén una Mentalidad Saludable</h5>
            <ul>
              <li>Acepta que la casa siempre tiene ventaja</li>
              <li>No intentes recuperar pérdidas apostando más</li>
              <li>Celebra las ganancias pequeñas y retíralas</li>
            </ul>
          </div>
        </div>

        <div class="warning-signs">
          <h4>⚠️ Señales de Advertencia</h4>
          <p>Busca ayuda si experimentas:</p>
          <ul>
            <li>Pérdida de control sobre el tiempo o dinero gastado</li>
            <li>Mentir sobre tus actividades de juego</li>
            <li>Jugar para escapar de problemas o emociones negativas</li>
            <li>Intentar recuperar pérdidas con apuestas más grandes</li>
            <li>Descuidar responsabilidades familiares o laborales</li>
            <li>Pedir prestado dinero para jugar</li>
          </ul>
        </div>

        <div class="help-resources">
          <h4>🆘 Recursos de Ayuda</h4>
          <ul>
            <li><strong>Jugadores Anónimos México:</strong> jugadoresanonimosmexico.org</li>
            <li><strong>BeGambleAware:</strong> begambleaware.org</li>
            <li><strong>GamCare:</strong> gamcare.org.uk</li>
            <li><strong>Gambling Therapy:</strong> gamblingtherapy.org</li>
          </ul>
        </div>

        <div class="casino-tools">
          <h4>🛠️ Herramientas del Casino</h4>
          <p>Busca casinos que ofrezcan:</p>
          <ul>
            <li><strong>Límites de Depósito:</strong> Controles diarios, semanales y mensuales</li>
            <li><strong>Límites de Tiempo:</strong> Alertas y límites de sesión</li>
            <li><strong>Auto-exclusión:</strong> Opción de suspender tu cuenta temporalmente</li>
            <li><strong>Verificación de Realidad:</strong> Recordatorios sobre tiempo y dinero gastado</li>
          </ul>
        </div>
      </div>

      <div id="preguntas-frecuentes" class="section">
        <h2 class="section-title">Preguntas Frecuentes</h2>
        
        <div class="faq-item">
          <h4>❓ ¿Es legal jugar en casinos online desde México?</h4>
          <p>El marco legal del juego online en México es complejo. Mientras que algunos operadores tienen licencias mexicanas, muchos jugadores utilizan casinos internacionales. Siempre verifica la regulación local actualizada y juega solo en casinos con licencias reconocidas internacionalmente.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Cómo puedo verificar si un casino es confiable?</h4>
          <p>Verifica la licencia en el sitio del regulador, lee reseñas de otros jugadores, comprueba los métodos de pago seguros, y busca certificaciones de terceros como eCOGRA. Un casino confiable será transparente sobre su licencia y términos.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Cuánto tiempo tardan los retiros?</h4>
          <p>Los tiempos varían según el método: monederos electrónicos (24-48 horas), tarjetas de crédito (3-5 días), transferencias bancarias (3-7 días). Los casinos confiables procesan retiros dentro de estas ventanas de tiempo.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Puedo jugar gratis antes de apostar dinero real?</h4>
          <p>Sí, la mayoría de los casinos ofrecen versiones demo de sus juegos. Esto te permite probar los juegos sin riesgo financiero y familiarizarte con las reglas antes de apostar dinero real.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Qué hacer si tengo problemas con un casino?</h4>
          <p>Primero contacta el soporte del casino documentando tu problema. Si no resuelven el issue, contacta la autoridad reguladora que emitió su licencia. También puedes buscar mediadores independientes como IBAS o eCOGRA.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Son seguros los casinos online?</h4>
          <p>Los casinos con licencias reconocidas y certificaciones de seguridad son seguros. Busca encriptación SSL, auditorías de terceros, y licencias de autoridades respetadas como MGA, UKGC, o Gibraltar.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Cómo funcionan los bonos de casino?</h4>
          <p>Los bonos son créditos adicionales que el casino te da, pero tienen requisitos de apuesta (rollover) que debes cumplir antes de retirar. Siempre lee los términos y condiciones completamente antes de reclamar cualquier bono.</p>
        </div>

        <div class="faq-item">
          <h4>❓ ¿Puedo ganar dinero real en casinos online?</h4>
          <p>Sí, puedes ganar dinero real, pero recuerda que los casinos tienen ventaja estadística. Juega de forma responsable, con dinero que puedas permitirte perder, y considera las ganancias como un bonus, no como ingresos esperados.</p>
        </div>
      </div>

      <div id="conclusion" class="section">
        <h2 class="section-title">Conclusión</h2>
        <p>Elegir el casino online correcto es una decisión importante que afectará significativamente tu experiencia de juego. Al seguir esta guía completa, tendrás las herramientas necesarias para evaluar casinos de manera objetiva y tomar decisiones informadas.</p>
        
        <div class="key-takeaways">
          <h4>🎯 Puntos Clave para Recordar</h4>
          <ul>
            <li><strong>La seguridad es lo primero:</strong> Solo juega en casinos con licencias válidas</li>
            <li><strong>Lee todos los términos:</strong> Especialmente los relacionados con bonos y retiros</li>
            <li><strong>Empieza pequeño:</strong> Prueba el casino con depósitos pequeños inicialmente</li>
            <li><strong>Juega responsablemente:</strong> Establece límites y respétalos siempre</li>
            <li><strong>Mantente informado:</strong> Las regulaciones y ofertas cambian constantemente</li>
          </ul>
        </div>

        <p>Recuerda que el juego online debe ser una forma de entretenimiento, no una fuente de ingresos o una solución a problemas financieros. Si sientes que estás perdiendo el control, busca ayuda profesional inmediatamente.</p>

        <div class="final-advice">
          <p><strong>Consejo final:</strong> Toma tu tiempo para investigar y no te apresures a registrarte en el primer casino que encuentres. Una elección cuidadosa al principio te ahorrará problemas y te garantizará una mejor experiencia de juego a largo plazo.</p>
        </div>
      </div>
    `,
    relatedGuides: [
      {
        slug: 'guia-bonos-casino-2024',
        title: 'Guía Completa de Bonos de Casino 2024',
        category: 'Bonos',
        readTime: '8 min'
      },
      {
        slug: 'metodos-pago-casinos-mexico',
        title: 'Métodos de Pago en Casinos Online México',
        category: 'Pagos',
        readTime: '6 min'
      },
      {
        slug: 'estrategias-blackjack-basico',
        title: 'Estrategias Básicas de Blackjack',
        category: 'Estrategia',
        readTime: '10 min'
      }
    ]
  }
};

export default function GuiaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const slug = params.slug as string;
    const guideData = guidesData[slug as keyof typeof guidesData];
    
    if (guideData) {
      setGuide(guideData);
      setLikes(guideData.likes || 0);
    }
  }, [params.slug]);

  useEffect(() => {
    if (!guide) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
      }
    );

    guide.tableOfContents.forEach((item: any) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [guide]);

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide?.title,
          text: guide?.subtitle,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Guía no encontrada</h1>
          <p className="text-gray-600 mb-4">La guía que buscas no existe o ha sido movida.</p>
          <Link 
            href="/guias"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Guías
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="hidden lg:block w-80 sticky top-8 h-fit">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Contenido</h3>
              </div>
              <nav className="space-y-1">
                {guide.tableOfContents.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } ${item.level === 3 ? 'ml-4 text-xs' : ''}`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-lg">
                  {guide.author.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{guide.author.name}</h4>
                  <p className="text-sm text-gray-600">{guide.author.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Experto en casinos online con más de 10 años de experiencia en la industria del juego. 
                Especializado en análisis de seguridad y regulaciones internacionales.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="py-8">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a Guías
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-600 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {guide.category}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-sm flex items-center gap-2 ${
                    guide.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                    guide.difficulty === 'Intermedio' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <Target className="w-4 h-4" />
                    {guide.difficulty}
                  </span>
                  {guide.tags.map((tag: string) => (
                    <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {guide.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6">
                  {guide.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {guide.author.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(guide.publishDate).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {guide.readTime} de lectura
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {guide.views.toLocaleString()} visualizaciones
                  </span>
                </div>

                <div className="flex gap-3 mb-8">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isBookmarked 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Guardado' : 'Guardar'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-200"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </button>
                  <button
                    onClick={() => setLikes(likes + 1)}
                    className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-200"
                  >
                    <Heart className={`w-5 h-5 ${likes > guide.likes ? 'fill-red-500 text-red-500' : ''}`} />
                    {likes}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 md:p-12 mb-8 shadow-sm"
            >
              <div 
                className="prose prose-lg max-w-none guide-content"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
            </motion.article>

            {/* Social Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 mb-8 shadow-sm"
            >
              <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-4">¿Te ha sido útil esta guía?</h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setLikes(likes + 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>Útil ({likes})</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Compartir</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comentar</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Related Guides */}
            {guide.relatedGuides && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-green-600" />
                  Guías Relacionadas
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {guide.relatedGuides.map((relatedGuide: any) => (
                    <Link
                      key={relatedGuide.slug}
                      href={`/guias/${relatedGuide.slug}`}
                      className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-600 font-medium">{relatedGuide.category}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {relatedGuide.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {relatedGuide.readTime}
                        </div>
                        <div className="text-green-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Leer más
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-center text-white mb-8"
            >
              <div className="max-w-md mx-auto">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-2xl font-bold mb-2">Mantente Actualizado</h3>
                <p className="mb-6 opacity-90">
                  Recibe las últimas guías, reseñas y ofertas exclusivas directamente en tu email.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Tu email aquí..."
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Suscribirse
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}