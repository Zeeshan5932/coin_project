import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Common
    paypal: 'PayPal',
    next: 'Next',
    back: 'Back',
    cancel: 'Cancel',
    continue: 'Continue',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Navigation
    home: 'Home',
    personal: 'Personal',
    business: 'Business',
    enterprise: 'Enterprise',
    developer: 'Developer',
    help: 'Help',
    login: 'Log In',
    logout: 'Log Out',
    signup: 'Sign Up',
    
    // Homepage
    newPayPalApp: 'The New PayPal app is here',
    learnMore: 'Learn more about the new features',
    scanCode: 'Scan the code or enter your number to get the app.',
    sendLink: 'Send Link',
    phoneNumber: 'Phone number',
    
    // Login Form
    signInToAccount: 'Sign in to your account',
    emailOrMobile: 'Email or mobile number',
    password: 'Password',
    forgotEmail: 'Forgot email?',
    forgotPassword: 'Forgot password?',
    signingIn: 'Signing in...',
    changeEmail: 'Change',
    or: 'or',
    backToHome: 'Back to Home',
    
    // Signup Form
    signUpForPayPal: 'Sign up for PayPal',
    yourEmail: 'Your email',
    firstName: 'First name',
    lastName: 'Last name',
    mobileNumber: 'Mobile number',
    createPassword: 'Create password',
    confirmPassword: 'Confirm password',
    country: 'Country',
    agreeToTerms: 'By continuing, you confirm that you are authorized to use this phone number and agree to receive text messages. Carrier fees may apply.',
    
    // Dashboard
    welcome: 'Welcome',
    balance: 'Balance',
    sendMoney: 'Send Money',
    requestMoney: 'Request Money',
    paymentRequests: 'Payment Requests',
    transactions: 'Transactions',
    
    // Footer
    contactUs: 'Contact Us',
    privacy: 'Privacy',
    legal: 'Legal',
    policyUpdates: 'Policy Updates',
    worldwide: 'Worldwide',
    
    // Languages
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    chinese: '中文',
    
    // Countries
    unitedStates: 'United States',
    canada: 'Canada',
    unitedKingdom: 'United Kingdom',
    france: 'France',
    spain: 'Spain',
    germany: 'Germany',
    china: 'China',
    
    // Validation Messages
    pleaseEnterEmail: 'Please enter your email address',
    pleaseEnterValidEmail: 'Please enter a valid email address',
    pleaseEnterPassword: 'Please enter your password',
    pleaseEnterFirstName: 'Please enter your first name',
    pleaseEnterLastName: 'Please enter your last name',
    pleaseEnterPhone: 'Please enter your phone number',
    passwordsDoNotMatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 8 characters',
    
    // Password Strength
    passwordStrength: 'Password strength',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    enterStrongerPassword: 'Enter a stronger password'
  },
  
  fr: {
    // Common
    paypal: 'PayPal',
    next: 'Suivant',
    back: 'Retour',
    cancel: 'Annuler',
    continue: 'Continuer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Navigation
    home: 'Accueil',
    personal: 'Personnel',
    business: 'Entreprise',
    enterprise: 'Grande entreprise',
    developer: 'Développeur',
    help: 'Aide',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    signup: 'S\'inscrire',
    
    // Homepage
    newPayPalApp: 'La nouvelle application PayPal est arrivée',
    learnMore: 'En savoir plus sur les nouvelles fonctionnalités',
    scanCode: 'Scannez le code ou saisissez votre numéro pour obtenir l\'application.',
    sendLink: 'Envoyer le lien',
    phoneNumber: 'Numéro de téléphone',
    
    // Login Form
    signInToAccount: 'Connectez-vous à votre compte',
    emailOrMobile: 'E-mail ou numéro de mobile',
    password: 'Mot de passe',
    forgotEmail: 'E-mail oublié ?',
    forgotPassword: 'Mot de passe oublié ?',
    signingIn: 'Connexion en cours...',
    changeEmail: 'Modifier',
    or: 'ou',
    backToHome: 'Retour à l\'accueil',
    
    // Signup Form
    signUpForPayPal: 'S\'inscrire à PayPal',
    yourEmail: 'Votre e-mail',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    mobileNumber: 'Numéro de mobile',
    createPassword: 'Créer un mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    country: 'Pays',
    agreeToTerms: 'En continuant, vous confirmez que vous êtes autorisé à utiliser ce numéro de téléphone et acceptez de recevoir des messages texte. Des frais d\'opérateur peuvent s\'appliquer.',
    
    // Dashboard
    welcome: 'Bienvenue',
    balance: 'Solde',
    sendMoney: 'Envoyer de l\'argent',
    requestMoney: 'Demander de l\'argent',
    paymentRequests: 'Demandes de paiement',
    transactions: 'Transactions',
    
    // Footer
    contactUs: 'Nous contacter',
    privacy: 'Confidentialité',
    legal: 'Mentions légales',
    policyUpdates: 'Mises à jour de politique',
    worldwide: 'Mondial',
    
    // Languages
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    chinese: '中文',
    
    // Countries
    unitedStates: 'États-Unis',
    canada: 'Canada',
    unitedKingdom: 'Royaume-Uni',
    france: 'France',
    spain: 'Espagne',
    germany: 'Allemagne',
    china: 'Chine',
    
    // Validation Messages
    pleaseEnterEmail: 'Veuillez saisir votre adresse e-mail',
    pleaseEnterValidEmail: 'Veuillez saisir une adresse e-mail valide',
    pleaseEnterPassword: 'Veuillez saisir votre mot de passe',
    pleaseEnterFirstName: 'Veuillez saisir votre prénom',
    pleaseEnterLastName: 'Veuillez saisir votre nom de famille',
    pleaseEnterPhone: 'Veuillez saisir votre numéro de téléphone',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
    passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
    
    // Password Strength
    passwordStrength: 'Force du mot de passe',
    weak: 'Faible',
    medium: 'Moyen',
    strong: 'Fort',
    enterStrongerPassword: 'Saisissez un mot de passe plus fort'
  },
  
  es: {
    // Common
    paypal: 'PayPal',
    next: 'Siguiente',
    back: 'Atrás',
    cancel: 'Cancelar',
    continue: 'Continuar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    
    // Navigation
    home: 'Inicio',
    personal: 'Personal',
    business: 'Empresa',
    enterprise: 'Corporativo',
    developer: 'Desarrollador',
    help: 'Ayuda',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    signup: 'Registrarse',
    
    // Homepage
    newPayPalApp: 'La nueva aplicación PayPal está aquí',
    learnMore: 'Obtén más información sobre las nuevas funciones',
    scanCode: 'Escanea el código o ingresa tu número para obtener la aplicación.',
    sendLink: 'Enviar enlace',
    phoneNumber: 'Número de teléfono',
    
    // Login Form
    signInToAccount: 'Inicia sesión en tu cuenta',
    emailOrMobile: 'Correo electrónico o número móvil',
    password: 'Contraseña',
    forgotEmail: '¿Olvidaste el correo?',
    forgotPassword: '¿Olvidaste la contraseña?',
    signingIn: 'Iniciando sesión...',
    changeEmail: 'Cambiar',
    or: 'o',
    backToHome: 'Volver al inicio',
    
    // Signup Form
    signUpForPayPal: 'Registrarse en PayPal',
    yourEmail: 'Tu correo electrónico',
    firstName: 'Nombre',
    lastName: 'Apellido',
    mobileNumber: 'Número móvil',
    createPassword: 'Crear contraseña',
    confirmPassword: 'Confirmar contraseña',
    country: 'País',
    agreeToTerms: 'Al continuar, confirmas que estás autorizado a usar este número de teléfono y aceptas recibir mensajes de texto. Pueden aplicarse tarifas del operador.',
    
    // Dashboard
    welcome: 'Bienvenido',
    balance: 'Saldo',
    sendMoney: 'Enviar dinero',
    requestMoney: 'Solicitar dinero',
    paymentRequests: 'Solicitudes de pago',
    transactions: 'Transacciones',
    
    // Footer
    contactUs: 'Contáctanos',
    privacy: 'Privacidad',
    legal: 'Legal',
    policyUpdates: 'Actualizaciones de política',
    worldwide: 'Mundial',
    
    // Languages
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    chinese: '中文',
    
    // Countries
    unitedStates: 'Estados Unidos',
    canada: 'Canadá',
    unitedKingdom: 'Reino Unido',
    france: 'Francia',
    spain: 'España',
    germany: 'Alemania',
    china: 'China',
    
    // Validation Messages
    pleaseEnterEmail: 'Por favor ingresa tu dirección de correo electrónico',
    pleaseEnterValidEmail: 'Por favor ingresa una dirección de correo electrónico válida',
    pleaseEnterPassword: 'Por favor ingresa tu contraseña',
    pleaseEnterFirstName: 'Por favor ingresa tu nombre',
    pleaseEnterLastName: 'Por favor ingresa tu apellido',
    pleaseEnterPhone: 'Por favor ingresa tu número de teléfono',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
    
    // Password Strength
    passwordStrength: 'Fuerza de la contraseña',
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
    enterStrongerPassword: 'Ingresa una contraseña más fuerte'
  },
  
  zh: {
    // Common
    paypal: 'PayPal',
    next: '下一步',
    back: '返回',
    cancel: '取消',
    continue: '继续',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    
    // Navigation
    home: '首页',
    personal: '个人',
    business: '商业',
    enterprise: '企业',
    developer: '开发者',
    help: '帮助',
    login: '登录',
    logout: '退出',
    signup: '注册',
    
    // Homepage
    newPayPalApp: '全新PayPal应用程序已发布',
    learnMore: '了解更多新功能',
    scanCode: '扫描二维码或输入您的号码以获取应用程序。',
    sendLink: '发送链接',
    phoneNumber: '电话号码',
    
    // Login Form
    signInToAccount: '登录您的账户',
    emailOrMobile: '电子邮件或手机号码',
    password: '密码',
    forgotEmail: '忘记邮箱？',
    forgotPassword: '忘记密码？',
    signingIn: '登录中...',
    changeEmail: '更改',
    or: '或',
    backToHome: '返回首页',
    
    // Signup Form
    signUpForPayPal: '注册PayPal',
    yourEmail: '您的电子邮件',
    firstName: '名字',
    lastName: '姓氏',
    mobileNumber: '手机号码',
    createPassword: '创建密码',
    confirmPassword: '确认密码',
    country: '国家',
    agreeToTerms: '继续即表示您确认您有权使用此电话号码并同意接收短信。可能产生运营商费用。',
    
    // Dashboard
    welcome: '欢迎',
    balance: '余额',
    sendMoney: '发送资金',
    requestMoney: '请求资金',
    paymentRequests: '付款请求',
    transactions: '交易记录',
    
    // Footer
    contactUs: '联系我们',
    privacy: '隐私',
    legal: '法律',
    policyUpdates: '政策更新',
    worldwide: '全球',
    
    // Languages
    english: 'English',
    french: 'Français',
    spanish: 'Español',
    chinese: '中文',
    
    // Countries
    unitedStates: '美国',
    canada: '加拿大',
    unitedKingdom: '英国',
    france: '法国',
    spain: '西班牙',
    germany: '德国',
    china: '中国',
    
    // Validation Messages
    pleaseEnterEmail: '请输入您的电子邮件地址',
    pleaseEnterValidEmail: '请输入有效的电子邮件地址',
    pleaseEnterPassword: '请输入您的密码',
    pleaseEnterFirstName: '请输入您的名字',
    pleaseEnterLastName: '请输入您的姓氏',
    pleaseEnterPhone: '请输入您的电话号码',
    passwordsDoNotMatch: '密码不匹配',
    passwordTooShort: '密码必须至少8个字符',
    
    // Password Strength
    passwordStrength: '密码强度',
    weak: '弱',
    medium: '中等',
    strong: '强',
    enterStrongerPassword: '请输入更强的密码'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('paypal-language', languageCode);
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  // Load saved language on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('paypal-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'zh', name: '中文', flag: '🇨🇳' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};