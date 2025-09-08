// Email verification using the working Gmail system
const { sendEmail } = require('./gmail-working');

async function sendVerificationEmail(email, name, token) {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'}/es/auth/verify-email?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px;
            }
            .container { 
              background: #ffffff; 
              border-radius: 12px; 
              box-shadow: 0 2px 20px rgba(0,0,0,0.1); 
              overflow: hidden;
            }
            .header { 
              background: linear-gradient(135deg, #10b981, #059669); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .logo {
              font-size: 48px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .content { 
              padding: 40px 30px;
              background: #f9fafb;
            }
            h1 {
              margin: 0;
              font-size: 28px;
            }
            h2 {
              color: #1a1a1a;
              font-size: 24px;
              margin-top: 0;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #10b981, #059669); 
              color: white !important; 
              padding: 14px 32px; 
              text-decoration: none; 
              border-radius: 8px; 
              font-weight: 600;
              margin: 25px 0;
            }
            .warning {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 12px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer { 
              text-align: center; 
              padding: 20px;
              color: #666; 
              font-size: 12px;
              border-top: 1px solid #e5e5e5;
            }
            .link-text {
              word-break: break-all;
              color: #059669;
              font-size: 12px;
              background: #f0fdf4;
              padding: 10px;
              border-radius: 4px;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎰</div>
              <h1>Verifica tu cuenta</h1>
            </div>
            <div class="content">
              <h2>¡Hola ${name || 'Usuario'}!</h2>
              
              <p>Gracias por registrarte en <strong>CasinosPesos</strong>. Estás a un paso de completar tu registro.</p>
              
              <p>Por favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente botón:</p>
              
              <center>
                <a href="${verificationUrl}" class="button">
                  ✅ Verificar mi cuenta
                </a>
              </center>
              
              <div class="warning">
                <strong>⏰ Importante:</strong> Este enlace expirará en 24 horas.
              </div>
              
              <p style="font-size: 14px; color: #666;">
                Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:
              </p>
              
              <div class="link-text">
                ${verificationUrl}
              </div>
              
              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                Si no creaste una cuenta en CasinosPesos, puedes ignorar este mensaje de forma segura.
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 CasinosPesos. Todos los derechos reservados.</p>
              <p>
                Este es un mensaje automático, por favor no respondas a este correo.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const result = await sendEmail({
      to: email,
      subject: '✅ Verifica tu cuenta - CasinosPesos',
      html,
      from: 'CasinosPesos <albertokiddi1992@gmail.com>'
    });
    
    return result.success;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

async function sendWelcomeEmail(email, name) {
  try {
    const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'}/dashboard`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px;
            }
            .container { 
              background: #ffffff; 
              border-radius: 12px; 
              box-shadow: 0 2px 20px rgba(0,0,0,0.1); 
              overflow: hidden;
            }
            .header { 
              background: linear-gradient(135deg, #10b981, #059669); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .content { 
              padding: 40px 30px;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #10b981, #059669); 
              color: white !important; 
              padding: 14px 32px; 
              text-decoration: none; 
              border-radius: 8px; 
              font-weight: 600;
              margin: 25px 0;
            }
            .success-box {
              background: #d1fae5;
              border-left: 4px solid #10b981;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .features {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .feature-item {
              padding: 8px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡Bienvenido a CasinosPesos!</h1>
            </div>
            <div class="content">
              <h2>¡Hola ${name || 'Usuario'}!</h2>
              
              <div class="success-box">
                <strong>✅ Tu cuenta ha sido verificada exitosamente</strong>
              </div>
              
              <p>Nos alegra tenerte como parte de la comunidad de CasinosPesos. Ahora tienes acceso completo a todas nuestras funciones:</p>
              
              <div class="features">
                <div class="feature-item">💰 <strong>Comparar bonos</strong> - Los mejores bonos de casino</div>
                <div class="feature-item">🎰 <strong>Reseñas exclusivas</strong> - Análisis detallados</div>
                <div class="feature-item">⭐ <strong>Favoritos</strong> - Guarda tus casinos preferidos</div>
                <div class="feature-item">🎁 <strong>Ofertas personalizadas</strong> - Promociones especiales</div>
                <div class="feature-item">📊 <strong>Estadísticas</strong> - Análisis y comparaciones</div>
              </div>
              
              <center>
                <a href="${dashboardUrl}" class="button">
                  Ir a mi Dashboard →
                </a>
              </center>
              
              <p style="margin-top: 30px;">
                <strong>¿Qué hacer ahora?</strong>
              </p>
              <ol>
                <li>Completa tu perfil para recibir recomendaciones personalizadas</li>
                <li>Explora nuestro catálogo de casinos verificados</li>
                <li>Aprovecha los bonos exclusivos para nuevos usuarios</li>
              </ol>
              
              <p style="margin-top: 30px; color: #666;">
                Si tienes alguna pregunta, no dudes en contactarnos.
              </p>
              
              <p>
                ¡Buena suerte y que disfrutes tu experiencia!<br>
                <strong>El equipo de CasinosPesos</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const result = await sendEmail({
      to: email,
      subject: '🎉 ¡Bienvenido a CasinosPesos!',
      html,
      from: 'CasinosPesos <albertokiddi1992@gmail.com>'
    });
    
    return result.success;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail
};