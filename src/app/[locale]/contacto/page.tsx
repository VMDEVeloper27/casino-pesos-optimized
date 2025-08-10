'use client';

import { useState } from 'react';
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Mensaje enviado exitosamente. Te responderemos pronto.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: data.error || 'Error al enviar el mensaje. Por favor intenta de nuevo.'
        });
      }
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Error al enviar el mensaje. Por favor intenta de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: 'Email',
      content: 'soporte@casinospesos.com',
      link: 'mailto:soporte@casinospesos.com'
    },
    {
      icon: <Phone className="w-6 h-6 text-accent" />,
      title: 'Teléfono',
      content: '+52 55 1234 5678',
      link: 'tel:+5255123456789'
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: 'Horario',
      content: '24/7 - Siempre disponibles',
      link: null
    },
    {
      icon: <MapPin className="w-6 h-6 text-accent" />,
      title: 'Ubicación',
      content: 'Ciudad de México, México',
      link: null
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-900 pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Contacto
            </h1>
          </div>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ti. 
            Contáctanos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Tipo de consulta
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="general">Consulta general</option>
                      <option value="support">Soporte técnico</option>
                      <option value="business">Negocios</option>
                      <option value="complaint">Queja o sugerencia</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-300 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Cuéntanos más detalles..."
                  />
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-accent text-black px-6 py-4 rounded-xl font-bold hover:from-primary/90 hover:to-accent/90 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Información de contacto</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-sm text-neutral-300 hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-300">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/30">
              <h3 className="text-xl font-bold text-white mb-4">Preguntas frecuentes</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-1">¿Cuánto tardan en responder?</h4>
                  <p className="text-sm text-neutral-300">
                    Normalmente respondemos en menos de 24 horas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">¿Ofrecen soporte telefónico?</h4>
                  <p className="text-sm text-neutral-300">
                    Sí, estamos disponibles de lunes a domingo, 24/7.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">¿Puedo solicitar una reseña de un casino?</h4>
                  <p className="text-sm text-neutral-300">
                    Por supuesto, envíanos el nombre del casino y lo evaluaremos.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Síguenos</h3>
              <p className="text-sm text-neutral-300 mb-4">
                Mantente actualizado con las últimas noticias y promociones.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#"
                  className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="text-white">f</span>
                </a>
                <a 
                  href="#"
                  className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="text-white">X</span>
                </a>
                <a 
                  href="#"
                  className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="text-white">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}