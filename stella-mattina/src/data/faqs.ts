export interface FAQ {
  question: string
  answer: string
}

export const SERVICE_FAQS: Record<string, FAQ[]> = {
  'womens-health': [
    {
      question: 'What does a women\'s health visit at Stella Mattina cover?',
      answer:
        'Your visit includes a comprehensive review of your overall health — from reproductive wellness and hormonal balance to preventive screenings and chronic condition management. Our providers take time to listen and create a care plan that fits your unique needs.',
    },
    {
      question: 'How often should I schedule a well-woman exam?',
      answer:
        'Most women benefit from an annual well-woman exam. Your provider may recommend more frequent visits if you have ongoing health concerns, are managing a chronic condition, or are in a life stage that calls for closer monitoring, such as perimenopause.',
    },
    {
      question: 'Can Stella Mattina be my primary care provider for women\'s health?',
      answer:
        'Yes. Our team provides both OB/GYN and primary care services, so many of our patients choose us as their one-stop provider for preventive care, annual physicals, STI screenings, and reproductive health — all in one place.',
    },
    {
      question: 'Do you offer telehealth appointments for women\'s health?',
      answer:
        'We offer telehealth for select follow-up visits and consultations. For new-patient exams, Pap smears, or physical evaluations, an in-office visit is required. Contact our team to find out which appointment types are available virtually.',
    },
    {
      question: 'What should I bring to my first women\'s health appointment?',
      answer:
        'Bring a photo ID, your insurance card, a list of current medications and supplements, and any recent lab results or medical records you have. Arriving 10 minutes early gives our team time to get you set up comfortably.',
    },
  ],
  'gynecology': [
    {
      question: 'What happens during a gynecology exam?',
      answer:
        'A routine gynecology visit typically includes a pelvic exam, Pap smear (if due), breast exam, and a conversation about your reproductive health, contraception, and any concerns you\'ve been experiencing. It\'s a judgment-free space to ask questions.',
    },
    {
      question: 'How often do I need a Pap smear?',
      answer:
        'Current guidelines recommend a Pap smear every 3 years for women ages 21–65, or every 5 years if combined with an HPV test. Your provider will tailor the schedule based on your age, history, and any previous abnormal results.',
    },
    {
      question: 'Can I see a gynecologist even if I\'m not sexually active?',
      answer:
        'Absolutely. Gynecological care is important for all women regardless of sexual activity. We address hormonal health, menstrual concerns, pelvic pain, and preventive wellness — none of which require sexual activity to be relevant.',
    },
    {
      question: 'What should I do if I have unusual bleeding or pelvic pain?',
      answer:
        'Don\'t wait — schedule an appointment as soon as possible. Unusual bleeding or persistent pelvic pain can have many causes, most of them very treatable when caught early. Our team will evaluate your symptoms and create a plan to give you answers and relief.',
    },
    {
      question: 'Do you offer contraception counseling and management?',
      answer:
        'Yes. We discuss all contraceptive options — from birth control pills and patches to IUDs, implants, and barrier methods. We\'ll help you find the right fit for your lifestyle, health history, and family planning goals.',
    },
  ],
  'prenatal-care-near-me': [
    {
      question: 'When should I schedule my first prenatal appointment?',
      answer:
        'We recommend scheduling your first prenatal visit as soon as you confirm your pregnancy, ideally between 8 and 10 weeks. Early care helps establish your due date, identify any risk factors, and start your prenatal vitamin and nutrition plan.',
    },
    {
      question: 'How many prenatal visits will I have throughout my pregnancy?',
      answer:
        'Most low-risk pregnancies follow a schedule of monthly visits through 28 weeks, every two weeks from 28–36 weeks, and weekly visits from 36 weeks to delivery — roughly 10–15 visits total. High-risk pregnancies may require more frequent check-ins.',
    },
    {
      question: 'Do you deliver babies, or will you refer me to an OB for delivery?',
      answer:
        'Our providers manage prenatal care and will coordinate your delivery plan. Depending on your pregnancy and health history, we may co-manage your care with a hospital-based OB or maternal-fetal medicine specialist. We\'ll discuss your delivery options at your first visit.',
    },
    {
      question: 'What prenatal screenings do you offer?',
      answer:
        'We offer first-trimester genetic screenings, nuchal translucency ultrasounds, quad screens, glucose tolerance testing, Group B strep testing, and more. Our team will walk you through which tests are recommended for your pregnancy and what the results mean.',
    },
    {
      question: 'Can I continue to see my regular Stella Mattina provider during pregnancy?',
      answer:
        'Yes — continuity of care is one of our strengths. Your established provider can continue managing your prenatal care, so you\'re always with someone who knows your health history and makes you feel at ease.',
    },
  ],
  'maternal-fetal-medicine': [
    {
      question: 'What is maternal-fetal medicine and who needs it?',
      answer:
        'Maternal-fetal medicine (MFM) is a subspecialty focused on managing high-risk pregnancies. You may be referred if you have a pre-existing condition like diabetes or hypertension, a history of pregnancy complications, are carrying multiples, or if a routine screening indicates a potential concern.',
    },
    {
      question: 'Does seeing an MFM specialist mean something is wrong with my pregnancy?',
      answer:
        'Not necessarily. Many patients are referred for closer monitoring as a precaution rather than because a problem has been confirmed. An MFM consultation gives you and your care team detailed information so you can make informed decisions together.',
    },
    {
      question: 'What tests and procedures does maternal-fetal medicine involve?',
      answer:
        'MFM care can include advanced ultrasounds (including anatomy scans and Doppler studies), amniocentesis, chorionic villus sampling (CVS), fetal echocardiography, and detailed genetic counseling. Your provider will recommend only what\'s clinically appropriate for your situation.',
    },
    {
      question: 'Will I still see my regular OB during MFM care?',
      answer:
        'Yes. MFM specialists typically co-manage your care alongside your primary OB. You\'ll continue your regular prenatal visits while also seeing the MFM team for specialized monitoring. Communication between providers keeps everyone aligned on your care plan.',
    },
    {
      question: 'How early in pregnancy should I see an MFM specialist if I have a high-risk condition?',
      answer:
        'Ideally, before or in the first trimester — especially if you have a known condition like Type 1 diabetes, lupus, or a history of preterm birth. Early involvement allows the team to optimize your management plan from the start.',
    },
  ],
  'biote-hormone-therapy': [
    {
      question: 'What is BioTE hormone therapy and how does it work?',
      answer:
        'BioTE uses bioidentical hormone pellets — small, custom-compounded pellets derived from plant sources — that are inserted just under the skin. They release a consistent, steady dose of hormones over 3 to 6 months, avoiding the peaks and valleys of pills or patches.',
    },
    {
      question: 'Who is a good candidate for BioTE therapy?',
      answer:
        'BioTE may be right for you if you\'re experiencing symptoms of hormone imbalance such as fatigue, weight gain, low libido, brain fog, mood swings, sleep disturbances, or hot flashes. Both women and men can benefit. We\'ll run a comprehensive hormone panel to confirm whether pellet therapy fits your needs.',
    },
    {
      question: 'How quickly will I feel results from BioTE pellets?',
      answer:
        'Most patients notice an improvement in energy, mood, and sleep within 2 to 4 weeks of their first insertion. Full benefits — including changes in body composition and libido — are often felt after the second or third pellet cycle as levels are fine-tuned.',
    },
    {
      question: 'How often do the pellets need to be replaced?',
      answer:
        'Women typically need a new insertion every 3 to 4 months; men, every 4 to 6 months. Your provider will monitor your lab levels and schedule your next insertion based on how your body metabolizes the hormones.',
    },
    {
      question: 'Is the pellet insertion procedure painful?',
      answer:
        'The insertion is a quick, minimally invasive in-office procedure. We use a local anesthetic, so most patients feel only mild pressure. Downtime is minimal — most people return to normal activity the same day, with light activity restrictions for the first 48 hours.',
    },
  ],
  'hormone-pellet-therapy-dallas': [
    {
      question: 'What makes hormone pellet therapy different from other hormone replacement options in Dallas?',
      answer:
        'Unlike pills, patches, or creams that require daily application and create fluctuating hormone levels, pellet therapy delivers consistent bioidentical hormones 24/7 for months at a time. For Dallas patients with busy schedules, the convenience and steady delivery make a real difference in how they feel day to day.',
    },
    {
      question: 'Are hormone pellets bioidentical?',
      answer:
        'Yes. The pellets used in our hormone therapy program are bioidentical — meaning they are molecularly identical to the hormones your body produces naturally. This makes them highly compatible with your system and minimizes side effects for most patients.',
    },
    {
      question: 'How do I get started with hormone pellet therapy at Stella Mattina?',
      answer:
        'Start with a consultation and a comprehensive hormone blood panel. Once your provider reviews your labs and symptoms, they\'ll create a personalized pellet formulation. The insertion appointment is quick and typically scheduled within a week of your lab results.',
    },
    {
      question: 'Will insurance cover hormone pellet therapy in Dallas?',
      answer:
        'Pellet therapy is generally not covered by insurance as it is considered an elective treatment. However, the initial consultation and lab work may be covered depending on your plan. Our team will help you understand your options and the costs involved before you commit.',
    },
    {
      question: 'Can men receive hormone pellet therapy at your Dallas clinic?',
      answer:
        'Absolutely. Testosterone pellet therapy for men is one of our most requested services. Men experiencing low energy, reduced muscle mass, decreased libido, or mood changes related to low testosterone often see significant improvement with pellet therapy.',
    },
  ],
  'gynecologist-dallas': [
    {
      question: 'How do I find the right gynecologist in Dallas?',
      answer:
        'Look for a provider who is board-certified, experienced in the specific care you need (routine exams, prenatal care, hormone therapy, etc.), and someone you feel comfortable talking with openly. Stella Mattina has multiple Dallas locations with bilingual providers, making it easy to find a great fit.',
    },
    {
      question: 'Does Stella Mattina accept new gynecology patients in Dallas?',
      answer:
        'Yes, we are welcoming new patients at our Dallas-area locations. You can book online or call our office to schedule a new-patient gynecology appointment. We do our best to accommodate timely appointments, especially for urgent concerns.',
    },
    {
      question: 'What gynecological services do you offer at your Dallas locations?',
      answer:
        'Our Dallas gynecology services include annual well-woman exams, Pap smears, HPV testing, STI screening and treatment, contraception counseling, menopause management, abnormal bleeding evaluation, pelvic pain assessment, and referrals for advanced care when needed.',
    },
    {
      question: 'Do your Dallas gynecologists speak Spanish?',
      answer:
        'Yes. Several of our providers and staff members are fluent in Spanish, and we are proud to serve Dallas\'s Spanish-speaking communities. You can request a Spanish-speaking provider when scheduling your appointment.',
    },
    {
      question: 'What should I expect at my first gynecology appointment in Dallas?',
      answer:
        'Your first visit is about getting to know each other. We\'ll review your medical and family history, discuss any current concerns, and may perform a pelvic exam or Pap smear if it\'s due. There\'s no rush — we want you to leave feeling informed and cared for.',
    },
  ],
  'ginecologo-dallas': [
    {
      question: '¿Stella Mattina tiene ginecólogos que hablan español en Dallas?',
      answer:
        'Sí. Varios de nuestros proveedores y personal hablan español con fluidez. Nos enorgullece atender a las comunidades hispanohablantes de Dallas y sus alrededores. Puede solicitar un proveedor de habla hispana al programar su cita.',
    },
    {
      question: 'What is a typical gynecology visit like at Stella Mattina?',
      answer:
        'A routine visit includes a review of your health history, a pelvic exam, and a Pap smear if it\'s time for one. Your provider will also discuss any concerns you have about your reproductive health, menstrual cycle, or birth control options in a warm, welcoming environment.',
    },
    {
      question: '¿Aceptan nuevas pacientes en sus clínicas de Dallas?',
      answer:
        'Sí, estamos aceptando nuevas pacientes en todas nuestras ubicaciones en el área de Dallas. Puede llamarnos o reservar en línea para una cita de nueva paciente. Nuestro personal bilingüe está listo para ayudarle.',
    },
    {
      question: 'Do I need a referral to see a gynecologist at Stella Mattina?',
      answer:
        'In most cases, no referral is needed. You can call or book online directly. If your insurance plan requires a referral, we recommend checking with your insurer before your visit — our front desk team is happy to assist.',
    },
    {
      question: '¿Qué servicios ginecológicos ofrece Stella Mattina?',
      answer:
        'Ofrecemos exámenes anuales de bienestar femenino, pruebas de Papanicolaou, detección de infecciones de transmisión sexual, asesoramiento anticonceptivo, manejo de la menopausia, evaluación de sangrado anormal y dolor pélvico, y referencias a especialistas cuando sea necesario.',
    },
  ],
  'primary-care-physician-dallas': [
    {
      question: 'What does a primary care visit at Stella Mattina cover?',
      answer:
        'Primary care visits cover annual physicals, preventive screenings (cholesterol, blood pressure, diabetes, thyroid), chronic disease management, minor illnesses and injuries, medication management, and referrals to specialists. We treat the whole person, not just the presenting symptom.',
    },
    {
      question: 'Do I need a primary care doctor if I already see a specialist?',
      answer:
        'Yes — a primary care physician coordinates your overall health, manages preventive care, and ensures your specialists are working from the same information. Many health issues are caught at annual physicals before they become serious, and that\'s what primary care does best.',
    },
    {
      question: 'Is Stella Mattina accepting new primary care patients in Dallas?',
      answer:
        'Yes, we are accepting new primary care patients at our Dallas locations. We serve both men and women and offer same-day and next-day appointments for urgent needs. Book online or call to get started.',
    },
    {
      question: 'Can my primary care provider at Stella Mattina also manage my women\'s health needs?',
      answer:
        'Absolutely. Our providers are trained in both primary care and women\'s health, so you can often address your annual physical, preventive screenings, and gynecological care in a single practice — saving you time and keeping your care coordinated.',
    },
    {
      question: 'What chronic conditions does your Dallas primary care team manage?',
      answer:
        'Our team manages hypertension, Type 2 diabetes, high cholesterol, asthma, thyroid disorders, obesity, and more. We focus on long-term management with personalized plans that combine medication, lifestyle changes, and regular monitoring to keep you feeling your best.',
    },
  ],
}

export function getFaqsForService(slug: string): FAQ[] {
  return SERVICE_FAQS[slug] ?? []
}
