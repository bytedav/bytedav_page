import { HOLDING_CONFIG, PORTFOLIO_BRANDS } from './holdingData';

/**
 * Contenido de las páginas legales de Bytedav.
 * Son generales a propósito: aplican a todos los sitios, aplicaciones y
 * servicios de Bytedav y de sus marcas (Kaelos, Lidini y las que vengan).
 *
 * Para cambiar país, fecha o textos, edita solo este archivo.
 */

export type LegalDocId = 'privacidad' | 'terminos';

/** string = párrafo, string[] = lista con viñetas */
export type LegalBlock = string | string[];

export interface LegalSection {
  id: string;
  title: string;
  body: LegalBlock[];
}

export interface LegalDoc {
  id: LegalDocId;
  path: string;
  title: string;
  heading: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
}

// ---- Ajustes editables ---------------------------------------------------
export const LEGAL_LAST_UPDATED = '21 de noviembre de 2026';
export const LEGAL_LAST_UPDATED_ISO = '2026-11-21';
export const LEGAL_COUNTRY = 'Perú';
export const LEGAL_DATA_LAW = 'Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento';
// --------------------------------------------------------------------------

const NAME = HOLDING_CONFIG.name;
const EMAIL = HOLDING_CONFIG.contactEmail;
const DOMAIN = HOLDING_CONFIG.domain.replace(/^https?:\/\//, '');

const brandNames = PORTFOLIO_BRANDS.map((b) => b.name.charAt(0) + b.name.slice(1).toLowerCase());
const brandsText = brandNames.length
  ? `, entre ellas ${brandNames.join(', ')}, así como otras marcas y productos que ${NAME} lance en el futuro`
  : ', así como otras marcas y productos que lance en el futuro';

const PRIVACY: LegalDoc = {
  id: 'privacidad',
  path: '/privacidad',
  title: 'Política de Privacidad',
  heading: 'Política de Privacidad',
  intro: `Esta política explica qué datos personales recopila ${NAME}, para qué los usa, con quién los comparte y cuáles son tus derechos. Aplica a todos nuestros sitios web, aplicaciones y servicios, y a los de nuestras marcas.`,
  seoTitle: `Política de Privacidad | ${NAME}`,
  seoDescription: `Cómo ${NAME} y sus marcas recopilan, usan y protegen tus datos personales, incluido el inicio de sesión con Google, y cómo ejercer tus derechos.`,
  sections: [
    {
      id: 'quienes-somos',
      title: '1. Quiénes somos y alcance',
      body: [
        `${NAME} («${NAME}», «nosotros») es una empresa de tecnología que crea y opera marcas, sitios web, aplicaciones y servicios digitales${brandsText}. Cuando esta política habla de «nuestros servicios», se refiere a todos ellos.`,
        `${NAME} es el responsable del tratamiento de los datos personales descritos aquí, salvo cuando actuamos como encargado por cuenta de un cliente (ver la sección 7).`,
        'Algunos productos pueden tener un aviso de privacidad complementario con detalles propios. Si hay una diferencia, ese aviso prevalece solo en lo que se refiere a ese producto.',
      ],
    },
    {
      id: 'datos-que-recopilamos',
      title: '2. Datos que recopilamos',
      body: [
        'Según el servicio que uses, podemos recopilar:',
        [
          'Datos que nos das: nombre, correo electrónico, teléfono, empresa o cargo, contraseña (guardada de forma cifrada), datos de facturación y el contenido que envías o subes (mensajes, formularios, anuncios, fotos, archivos).',
          'Datos de tu cuenta de Google, si eliges iniciar sesión con Google (ver la sección 3).',
          'Datos técnicos y de uso: dirección IP, tipo de dispositivo y navegador, idioma, sistema operativo, páginas visitadas, fechas y horas de acceso, y errores.',
          'Datos de comunicaciones: los mensajes que nos escribes y el historial de atención al cliente.',
          'Datos de pago: los procesa un proveedor de pagos externo. Nosotros no almacenamos el número completo de tu tarjeta.',
        ],
        'No recopilamos datos personales sensibles a propósito. Te pedimos no enviarlos por nuestros servicios salvo que sea imprescindible y esté indicado.',
      ],
    },
    {
      id: 'google',
      title: '3. Inicio de sesión con Google',
      body: [
        'Algunos de nuestros servicios te permiten registrarte o iniciar sesión con tu cuenta de Google. Cuando lo haces, Google nos comparte únicamente estos datos básicos de tu perfil:',
        ['Tu nombre.', 'Tu dirección de correo electrónico.', 'Tu foto de perfil (si la tienes).', 'Un identificador único de tu cuenta de Google.'],
        'Usamos estos datos solo para crear tu cuenta, reconocerte cuando vuelves, evitar duplicados, mostrar tu nombre y foto dentro del servicio y enviarte avisos relacionados con tu cuenta. No accedemos a tu Gmail, Drive, contactos, calendario ni a ningún otro dato de tu cuenta de Google, a menos que lo solicitemos de forma expresa y tú lo autorices en una pantalla de permisos aparte.',
        'No vendemos estos datos, no los usamos para publicidad personalizada y no los transferimos a terceros salvo para operar el servicio, cumplir la ley o con tu consentimiento.',
        'El uso y la transferencia que hacemos de la información recibida de las APIs de Google cumple con la Política de Datos de Usuario de los Servicios de API de Google, incluidos los requisitos de Uso Limitado.',
        'Puedes retirar el acceso en cualquier momento desde la configuración de tu cuenta de Google, en la sección de seguridad, apartado de aplicaciones y servicios con acceso a tu cuenta. También puedes pedirnos que eliminemos tu cuenta y tus datos (sección 11).',
      ],
    },
    {
      id: 'finalidades',
      title: '4. Para qué usamos tus datos',
      body: [
        [
          'Crear y administrar tu cuenta y darte acceso a los servicios.',
          'Prestar, mantener y mejorar nuestros productos, y desarrollar nuevas funciones.',
          'Procesar pagos, emitir comprobantes y gestionar suscripciones.',
          'Responder consultas, brindar soporte y enviarte avisos del servicio (cambios, seguridad, facturación).',
          'Enviarte novedades u ofertas, solo si lo permites o la ley lo autoriza. Puedes darte de baja cuando quieras.',
          'Prevenir fraude, abuso y usos indebidos, y proteger la seguridad de usuarios y sistemas.',
          'Cumplir obligaciones legales y atender requerimientos de autoridades competentes.',
          'Generar estadísticas agregadas o anonimizadas sobre el uso de nuestros servicios.',
        ],
      ],
    },
    {
      id: 'base-legal',
      title: '5. Base para el tratamiento',
      body: [
        `Tratamos tus datos con tu consentimiento, para ejecutar el servicio o contrato que solicitas, para cumplir obligaciones legales y para nuestros intereses legítimos (seguridad, mejora del servicio, prevención de fraude), siempre conforme a la ${LEGAL_DATA_LAW}, y a la normativa que resulte aplicable en tu país.`,
      ],
    },
    {
      id: 'comparticion',
      title: '6. Con quién compartimos tus datos',
      body: [
        `No vendemos tus datos personales. Solo los compartimos cuando es necesario y con las medidas adecuadas, en estos casos:`,
        [
          'Proveedores que nos prestan servicios: alojamiento y almacenamiento en la nube, bases de datos, correo electrónico, analítica, procesamiento de pagos, mensajería y atención al cliente. Solo reciben lo necesario y están obligados a protegerlo.',
          `Otras marcas de ${NAME}, cuando sea necesario para operar el servicio o darte soporte.`,
          'Autoridades, cuando lo exija la ley o una orden válida, o para proteger derechos, seguridad y propiedad.',
          'Terceros en una fusión, adquisición o reorganización de la empresa, con aviso previo cuando corresponda.',
          'Otras personas, cuando tú lo decides (por ejemplo, al publicar un anuncio o contactar a un vendedor dentro de una plataforma).',
        ],
      ],
    },
    {
      id: 'encargado',
      title: '7. Servicios para empresas y datos de terceros',
      body: [
        `Algunos servicios de ${NAME} (por ejemplo, plataformas de mensajería y atención al cliente por WhatsApp u otros canales) los usan empresas que cargan o gestionan datos de sus propios clientes y contactos. En ese caso, la empresa cliente es la responsable de esos datos y ${NAME} los trata como encargado, siguiendo sus instrucciones y esta política.`,
        'Si eres contacto de una de esas empresas y quieres ejercer tus derechos, escríbenos y te ayudaremos a canalizar tu solicitud, o contáctala directamente.',
        'Nuestros servicios pueden integrarse con plataformas de terceros (como Meta/WhatsApp, Google o pasarelas de pago). Esas plataformas tienen sus propias políticas de privacidad, que te recomendamos leer.',
      ],
    },
    {
      id: 'cookies',
      title: '8. Cookies y tecnologías similares',
      body: [
        'Usamos cookies y almacenamiento local para mantener tu sesión iniciada, recordar preferencias, proteger la seguridad y entender cómo se usan nuestros servicios. Puedes bloquear o borrar las cookies desde la configuración de tu navegador, aunque algunas funciones podrían dejar de funcionar correctamente.',
      ],
    },
    {
      id: 'conservacion',
      title: '9. Cuánto tiempo conservamos tus datos',
      body: [
        'Conservamos tus datos mientras tengas una cuenta activa o los necesitemos para prestarte el servicio. Después, los eliminamos o anonimizamos, salvo que debamos guardarlos más tiempo por obligaciones legales, contables, de seguridad o para resolver disputas.',
      ],
    },
    {
      id: 'seguridad',
      title: '10. Seguridad y transferencias internacionales',
      body: [
        'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: cifrado en tránsito, control de accesos, copias de seguridad y revisiones periódicas. Ningún sistema es 100 % seguro, por lo que no podemos garantizar una seguridad absoluta; si ocurre un incidente que te afecte, actuaremos y te avisaremos como exige la ley.',
        'Nuestros proveedores pueden estar ubicados en otros países. Cuando transferimos datos fuera de tu país, lo hacemos con garantías adecuadas de protección.',
      ],
    },
    {
      id: 'derechos',
      title: '11. Tus derechos',
      body: [
        'Tienes derecho a:',
        [
          'Acceder a los datos personales que tenemos sobre ti.',
          'Rectificar datos inexactos o incompletos.',
          'Cancelar o eliminar tus datos cuando ya no sean necesarios o retires tu consentimiento.',
          'Oponerte a ciertos tratamientos, y retirar tu consentimiento en cualquier momento.',
          'Solicitar información sobre cómo tratamos tus datos, y la portabilidad cuando la ley lo permita.',
        ],
        `Para ejercer cualquiera de estos derechos, escríbenos a ${EMAIL} indicando tu nombre, el servicio que usas y qué solicitas. Es posible que te pidamos verificar tu identidad. Responderemos dentro de los plazos legales. Si consideras que no atendimos bien tu solicitud, puedes acudir a la autoridad de protección de datos de tu país.`,
      ],
    },
    {
      id: 'menores',
      title: '12. Menores de edad',
      body: [
        'Nuestros servicios no están dirigidos a menores de 18 años y no recopilamos sus datos a sabiendas. Si crees que un menor nos dio datos sin autorización de sus padres o tutores, escríbenos y los eliminaremos.',
      ],
    },
    {
      id: 'cambios',
      title: '13. Cambios a esta política',
      body: [
        `Podemos actualizar esta política cuando cambien nuestros servicios o la ley. Publicaremos la versión vigente en ${DOMAIN}/privacidad con su fecha de actualización y, si el cambio es importante, te avisaremos por un medio visible.`,
      ],
    },
    {
      id: 'contacto',
      title: '14. Contacto',
      body: [`Si tienes preguntas sobre esta política o sobre tus datos, escríbenos a ${EMAIL}.`],
    },
  ],
};

const TERMS: LegalDoc = {
  id: 'terminos',
  path: '/terminos',
  title: 'Términos y Condiciones',
  heading: 'Términos y Condiciones del Servicio',
  intro: `Estos términos regulan el uso de los sitios web, aplicaciones y servicios de ${NAME} y de sus marcas. Al usarlos, aceptas estas condiciones. Léelas con calma.`,
  seoTitle: `Términos y Condiciones del Servicio | ${NAME}`,
  seoDescription: `Condiciones de uso de los sitios, aplicaciones y servicios de ${NAME} y sus marcas: cuentas, uso aceptable, pagos, responsabilidad y más.`,
  sections: [
    {
      id: 'aceptacion',
      title: '1. Aceptación y alcance',
      body: [
        `Estos Términos y Condiciones («Términos») son un acuerdo entre tú y ${NAME} («${NAME}», «nosotros»). Se aplican a todos nuestros sitios web, aplicaciones, plataformas y servicios${brandsText} (los «Servicios»).`,
        'Al crear una cuenta, iniciar sesión o usar los Servicios, declaras que leíste y aceptas estos Términos y la Política de Privacidad. Si no estás de acuerdo, no uses los Servicios.',
        'Algunos productos pueden tener condiciones adicionales (por ejemplo, planes, tarifas o reglas propias). Esas condiciones se suman a estos Términos y, si hay conflicto, prevalecen solo para ese producto.',
        'Si usas los Servicios en nombre de una empresa, declaras que tienes autoridad para obligarla, y «tú» incluye a esa empresa.',
      ],
    },
    {
      id: 'cuentas',
      title: '2. Cuentas y acceso',
      body: [
        [
          'Debes tener al menos 18 años y capacidad legal para aceptar estos Términos.',
          'La información que das al registrarte debe ser veraz, completa y estar actualizada.',
          'Puedes registrarte con correo y contraseña o con tu cuenta de Google. Eres responsable de la actividad que ocurra en tu cuenta y de mantener seguras tus credenciales.',
          'Avísanos de inmediato si sospechas un acceso no autorizado.',
        ],
      ],
    },
    {
      id: 'uso-aceptable',
      title: '3. Uso aceptable',
      body: [
        'Te comprometes a usar los Servicios de forma lícita y respetuosa. Está prohibido:',
        [
          'Usarlos para fines ilegales, fraudulentos, engañosos o que vulneren derechos de otras personas.',
          'Enviar spam, mensajes masivos no solicitados o comunicaciones sin el consentimiento requerido.',
          'Publicar o transmitir contenido ofensivo, discriminatorio, violento, sexualmente explícito, que infrinja derechos de autor o que suplante a otra persona.',
          'Intentar acceder sin autorización a sistemas, cuentas o datos, o interferir con el funcionamiento o la seguridad de los Servicios.',
          'Hacer ingeniería inversa, copiar, revender o explotar los Servicios, salvo lo permitido por la ley o por escrito por nosotros.',
          'Usar bots, scrapers u otros medios automatizados sin nuestra autorización.',
          'Introducir virus, malware o código dañino.',
        ],
      ],
    },
    {
      id: 'contenido',
      title: '4. Tu contenido',
      body: [
        'Conservas la propiedad del contenido que subes, publicas o envías a través de los Servicios (textos, imágenes, anuncios, datos, mensajes).',
        'Nos otorgas una licencia limitada, no exclusiva y gratuita para alojar, procesar, mostrar y transmitir ese contenido únicamente para operar, mantener y mejorar los Servicios y prestártelos a ti.',
        'Eres responsable de tu contenido y declaras que tienes los derechos necesarios para usarlo y que no infringe la ley ni derechos de terceros. Podemos retirar contenido que incumpla estos Términos.',
      ],
    },
    {
      id: 'terceros',
      title: '5. Servicios y plataformas de terceros',
      body: [
        'Los Servicios pueden funcionar junto con plataformas de terceros, como Google, Meta/WhatsApp o proveedores de pago. Su uso está sujeto a sus propios términos y políticas, que debes cumplir.',
        'Cuando uses herramientas de mensajería o comunicación con tus propios contactos, eres responsable de contar con su consentimiento, de respetar las normas de la plataforma correspondiente y de la normativa de protección de datos y publicidad aplicable. No controlamos esas plataformas y no respondemos por sus cambios, cortes o decisiones, incluida la suspensión de cuentas.',
      ],
    },
    {
      id: 'plataformas-comercio',
      title: '6. Anuncios, compraventas y relaciones entre usuarios',
      body: [
        `Cuando un Servicio permita publicar anuncios o poner en contacto a compradores, vendedores u otras partes (por ejemplo, marketplaces de vehículos o de servicios), ${NAME} actúa como plataforma intermediaria. Salvo que se indique lo contrario, no somos parte de la operación entre usuarios ni garantizamos la calidad, legalidad, disponibilidad, estado o precio de lo anunciado.`,
        'Antes de cerrar una operación, verifica la identidad de la otra parte, la información y la documentación correspondiente. Los acuerdos y pagos entre usuarios son responsabilidad exclusiva de quienes los celebran.',
      ],
    },
    {
      id: 'pagos',
      title: '7. Planes, pagos y cancelaciones',
      body: [
        'Algunos Servicios son gratuitos y otros de pago, con suscripciones o cargos únicos. El precio, la moneda, los impuestos y la periodicidad se muestran antes de que confirmes la compra.',
        [
          'Las suscripciones se renuevan automáticamente al final de cada periodo, hasta que las canceles.',
          'Puedes cancelar cuando quieras; la cancelación aplica desde el siguiente periodo de facturación.',
          'Salvo que la ley o la oferta indique otra cosa, los pagos realizados no son reembolsables.',
          'Podemos cambiar los precios con aviso previo razonable; el cambio aplicará desde la siguiente renovación.',
        ],
        'Si un pago falla o no se realiza, podemos limitar o suspender el acceso al Servicio de pago.',
      ],
    },
    {
      id: 'propiedad-intelectual',
      title: '8. Propiedad intelectual',
      body: [
        `Los Servicios, su código, diseño, marcas, nombres, logotipos y contenidos propios son de ${NAME} o de sus licenciantes y están protegidos por las leyes de propiedad intelectual. Estos Términos solo te dan un derecho limitado, revocable, no exclusivo e intransferible de usar los Servicios según su finalidad. No te transfieren ningún derecho de propiedad.`,
        'Si nos envías comentarios o sugerencias, podemos usarlos para mejorar los Servicios sin obligación hacia ti.',
      ],
    },
    {
      id: 'disponibilidad',
      title: '9. Disponibilidad y cambios en el servicio',
      body: [
        'Trabajamos para que los Servicios estén disponibles y funcionen bien, pero pueden tener interrupciones por mantenimiento, fallas técnicas o causas ajenas a nosotros. Podemos modificar, suspender o discontinuar funciones o el servicio completo, avisándote con antelación razonable cuando sea posible.',
      ],
    },
    {
      id: 'garantias',
      title: '10. Exclusión de garantías',
      body: [
        'En la medida permitida por la ley, los Servicios se ofrecen «tal cual» y «según disponibilidad», sin garantías expresas o implícitas de comerciabilidad, idoneidad para un fin particular, disponibilidad continua o ausencia de errores. Esto no limita los derechos irrenunciables que te corresponden como consumidor.',
      ],
    },
    {
      id: 'responsabilidad',
      title: '11. Limitación de responsabilidad',
      body: [
        `En la medida permitida por la ley, ${NAME} no será responsable de daños indirectos, incidentales, especiales o consecuentes, ni de pérdida de ganancias, datos, clientes u oportunidades derivados del uso o la imposibilidad de usar los Servicios. Nuestra responsabilidad total frente a ti por cualquier reclamo se limitará al monto que hayas pagado por el Servicio en los 12 meses anteriores al hecho, o a una cantidad simbólica si usas un servicio gratuito.`,
        'Nada en estos Términos excluye la responsabilidad que no pueda excluirse por ley, como la derivada de dolo o culpa grave.',
      ],
    },
    {
      id: 'indemnidad',
      title: '12. Indemnidad',
      body: [
        `Te comprometes a mantener indemne a ${NAME}, a sus directivos y colaboradores frente a reclamos, daños y gastos (incluidos honorarios razonables de abogados) derivados de tu contenido, de tu uso indebido de los Servicios o del incumplimiento de estos Términos o de la ley.`,
      ],
    },
    {
      id: 'terminacion',
      title: '13. Suspensión y terminación',
      body: [
        'Puedes dejar de usar los Servicios y eliminar tu cuenta cuando quieras. Podemos suspender o cerrar tu cuenta, con o sin aviso previo según la gravedad, si incumples estos Términos, si hay riesgo para la seguridad o para terceros, o si la ley lo exige. Las cláusulas que por su naturaleza deban seguir vigentes (propiedad intelectual, limitación de responsabilidad, ley aplicable) continuarán tras la terminación.',
      ],
    },
    {
      id: 'privacidad',
      title: '14. Privacidad',
      body: [
        `El tratamiento de tus datos personales se rige por nuestra Política de Privacidad, publicada en ${DOMAIN}/privacidad, que forma parte de estos Términos.`,
      ],
    },
    {
      id: 'ley',
      title: '15. Ley aplicable y controversias',
      body: [
        `Estos Términos se rigen por las leyes de ${LEGAL_COUNTRY}. Intentaremos resolver cualquier controversia de buena fe y de forma amistosa. Si no es posible, se someterá a los jueces y tribunales competentes de ${LEGAL_COUNTRY}, sin perjuicio de los derechos que la normativa de protección al consumidor te reconozca.`,
      ],
    },
    {
      id: 'cambios',
      title: '16. Cambios a estos Términos',
      body: [
        'Podemos actualizar estos Términos. Publicaremos la versión vigente con su fecha de actualización y, si el cambio es relevante, te avisaremos con antelación razonable. Si sigues usando los Servicios después de la fecha de entrada en vigor, se entiende que aceptas los nuevos Términos.',
      ],
    },
    {
      id: 'contacto',
      title: '17. Contacto',
      body: [`Para consultas sobre estos Términos, escríbenos a ${EMAIL}.`],
    },
  ],
};

export const LEGAL_DOCS: Record<LegalDocId, LegalDoc> = {
  privacidad: PRIVACY,
  terminos: TERMS,
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** HTML plano del documento, para el <noscript> y los rastreadores (Google, IA). */
export const legalDocToHtml = (doc: LegalDoc): string => `
      <h1>${escapeHtml(doc.heading)} — ${NAME}</h1>
      <p><em>Última actualización: ${LEGAL_LAST_UPDATED}</em></p>
      <p>${escapeHtml(doc.intro)}</p>
      ${doc.sections
        .map(
          (s) => `
      <h2>${escapeHtml(s.title)}</h2>
      ${s.body
        .map((b) =>
          Array.isArray(b)
            ? `<ul>${b.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
            : `<p>${escapeHtml(b)}</p>`
        )
        .join('')}`
        )
        .join('')}
      <nav><a href="/">Inicio</a> | <a href="/privacidad">Política de Privacidad</a> | <a href="/terminos">Términos y Condiciones</a></nav>
    `;
