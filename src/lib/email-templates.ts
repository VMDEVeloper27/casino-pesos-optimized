// Email templates for various email types

export type EmailTemplate = 'verification' | 'welcome' | 'passwordReset';

interface TemplateData {
  name: string;
  [key: string]: any;
}

const baseStyles = `
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 30px;
      margin-top: 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 2px solid #f0f0f0;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #10b981, #059669);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 30px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 30px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background: linear-gradient(135deg, #059669, #047857);
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e5e5;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .warning {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 12px;
      margin: 20px 0;
      font-size: 14px;
      color: #92400e;
    }
    .success {
      background: #d1fae5;
      border: 1px solid #10b981;
      border-radius: 8px;
      padding: 12px;
      margin: 20px 0;
      font-size: 14px;
      color: #065f46;
    }
  </style>
`;

const headerHTML = `
  <div class="header">
    <div class="logo">C</div>
    <h1>CasinosPesos</h1>
  </div>
`;

const footerHTML = `
  <div class="footer">
    <p>© 2024 CasinosPesos. Todos los derechos reservados.</p>
    <p>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/terms" style="color: #059669;">Términos y Condiciones</a> | 
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy" style="color: #059669;">Política de Privacidad</a>
    </p>
    <p style="margin-top: 15px; font-size: 12px; color: #999;">
      Este es un mensaje automático, por favor no respondas a este correo.
    </p>
  </div>
`;

const templates = {
  verification: (data: TemplateData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifica tu cuenta</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        ${headerHTML}
        <div class="content">
          <h2>¡Hola ${data.name}!</h2>
          <p>Gracias por registrarte en CasinosPesos. Estás a un paso de completar tu registro.</p>
          <p>Por favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente botón:</p>
          
          <div style="text-align: center;">
            <a href="${data.verificationUrl}" class="button">Verificar mi cuenta</a>
          </div>
          
          <div class="warning">
            <strong>⏰ Importante:</strong> Este enlace expirará en ${data.expiryHours} horas.
          </div>
          
          <p>Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #059669; font-size: 14px;">
            ${data.verificationUrl}
          </p>
          
          <p>Si no creaste una cuenta en CasinosPesos, puedes ignorar este mensaje de forma segura.</p>
        </div>
        ${footerHTML}
      </div>
    </body>
    </html>
  `,

  welcome: (data: TemplateData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a CasinosPesos!</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        ${headerHTML}
        <div class="content">
          <h2>¡Bienvenido ${data.name}! 🎉</h2>
          
          <div class="success">
            <strong>✅ Tu cuenta ha sido verificada exitosamente</strong>
          </div>
          
          <p>Nos alegra tenerte como parte de la comunidad de CasinosPesos. Ahora tienes acceso completo a todas nuestras funciones:</p>
          
          <ul style="padding-left: 20px;">
            <li>💰 Comparar los mejores bonos de casino</li>
            <li>🎰 Acceder a reseñas exclusivas</li>
            <li>⭐ Guardar tus casinos favoritos</li>
            <li>🎁 Recibir ofertas personalizadas</li>
            <li>📊 Ver estadísticas y análisis detallados</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${data.dashboardUrl}" class="button">Ir a mi Dashboard</a>
          </div>
          
          <h3>¿Qué hacer ahora?</h3>
          <ol style="padding-left: 20px;">
            <li>Completa tu perfil para recibir recomendaciones personalizadas</li>
            <li>Explora nuestro catálogo de casinos verificados</li>
            <li>Aprovecha los bonos exclusivos para nuevos usuarios</li>
          </ol>
          
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
          
          <p>¡Buena suerte y que disfrutes tu experiencia!</p>
        </div>
        ${footerHTML}
      </div>
    </body>
    </html>
  `,

  passwordReset: (data: TemplateData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer contraseña</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        ${headerHTML}
        <div class="content">
          <h2>Hola ${data.name}</h2>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en CasinosPesos.</p>
          
          <p>Para crear una nueva contraseña, haz clic en el siguiente botón:</p>
          
          <div style="text-align: center;">
            <a href="${data.resetUrl}" class="button">Restablecer contraseña</a>
          </div>
          
          <div class="warning">
            <strong>⏰ Importante:</strong> Este enlace expirará en ${data.expiryHours} hora(s).
          </div>
          
          <p>Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #059669; font-size: 14px;">
            ${data.resetUrl}
          </p>
          
          <div style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; padding: 12px; margin: 20px 0;">
            <strong>🔒 Seguridad:</strong> Si no solicitaste restablecer tu contraseña, ignora este mensaje. Tu cuenta permanecerá segura.
          </div>
          
          <p>Por razones de seguridad, este enlace solo funcionará una vez.</p>
        </div>
        ${footerHTML}
      </div>
    </body>
    </html>
  `,
};

export function renderEmailTemplate(template: EmailTemplate, data: TemplateData): string {
  const templateFunction = templates[template];
  if (!templateFunction) {
    throw new Error(`Template "${template}" not found`);
  }
  return templateFunction(data);
}