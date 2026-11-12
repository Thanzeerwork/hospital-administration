const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const https = require('https');
const http = require('http');

// R2 credentials
const r2Client = new S3Client({
  region: 'auto',
  endpoint: 'https://d6e0e618a594c39ee7bf96cd59297564.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '3715c98506877f6f59b49886488c1240',
    secretAccessKey: '6bf1ddd84720b5923ba041865536533593c08196d9ff137d872df2e8a4a8c8e1',
  },
});

const BUCKET = 'hospitaladministration';
const PUBLIC_URL = 'https://pub-f6697a3e2acd4048a86b5ed54d969979.r2.dev';

// Fetch remote image buffer
function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function uploadFile(key, buffer, contentType) {
  await r2Client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  const publicUrl = `${PUBLIC_URL}/${key}`;
  console.log(`Uploaded to R2: ${publicUrl}`);
  return publicUrl;
}

// Specializations
const rawSpecializations = [
  {
    id: 'spec-pediatrics',
    name: 'Pediatrics',
    description: 'Comprehensive compassionate medical care for infants, children, and adolescents.',
    sourceImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    doctorCount: 8,
    icon: 'Baby',
  },
  {
    id: 'spec-gynecology',
    name: 'Gynecology',
    description: 'Expert women’s healthcare, prenatal diagnostics, obstetric surgery, and wellness.',
    sourceImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    doctorCount: 6,
    icon: 'HeartPulse',
  },
  {
    id: 'spec-cardiology',
    name: 'Cardiology',
    description: 'Advanced cardiovascular care, heart rhythm diagnostics, and catheterization lab procedures.',
    sourceImage: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
    doctorCount: 7,
    icon: 'Activity',
  },
  {
    id: 'spec-ophthalmology',
    name: 'Ophthalmology',
    description: 'Precision microsurgery, retinal health, pediatric vision, and laser corneal treatment.',
    sourceImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
    doctorCount: 5,
    icon: 'Eye',
  },
];

// Helper to generate dates around today
const getFutureDate = (daysFromNow) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
};

const getPastDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const rawDoctors = [
  {
    id: 'doc-wright',
    name: 'Dr. Alexander Wright',
    specializationId: 'spec-cardiology',
    specializationName: 'Cardiology',
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 142,
    sourceImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: 'Senior Interventional Cardiologist specializing in coronary interventions, structural heart diseases, and preventive cardiology. Fellowship trained at Massachusetts General Hospital.',
    email: 'alexander.wright@inspirezest.com',
    phone: '+91 9567333266',
    room: 'Cath Lab Wing A, Suite 302',
    username: 'dr.wright',
    password: 'password123',
    availableDates: [
      getFutureDate(1),
      getFutureDate(2),
      getFutureDate(4),
      getFutureDate(5),
      getFutureDate(8),
      getFutureDate(10),
      getFutureDate(12),
      getFutureDate(15),
    ],
    timeSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'],
    consultationFee: 160,
  },
  {
    id: 'doc-rostova',
    name: 'Dr. Elena Rostova',
    specializationId: 'spec-pediatrics',
    specializationName: 'Pediatrics',
    experienceYears: 11,
    rating: 4.95,
    reviewCount: 188,
    sourceImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated pediatrician with subspecialty training in pediatric pulmonology and developmental health. Renowned for creating a gentle, stress-free clinical environment for children.',
    email: 'elena.rostova@inspirezest.com',
    phone: '+91 9567333266',
    room: 'Childrens Health Pavilion, Room 104',
    username: 'dr.rostova',
    password: 'password123',
    availableDates: [
      getFutureDate(1),
      getFutureDate(3),
      getFutureDate(6),
      getFutureDate(7),
      getFutureDate(9),
      getFutureDate(11),
      getFutureDate(14),
    ],
    timeSlots: ['08:30 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM'],
    consultationFee: 140,
  },
  {
    id: 'doc-sharma',
    name: 'Dr. Priya Sharma',
    specializationId: 'spec-gynecology',
    specializationName: 'Gynecology',
    experienceYears: 13,
    rating: 4.88,
    reviewCount: 164,
    sourceImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'Chief of Obstetrics and Gynecological Surgery. Expert in minimally invasive laparoscopic surgery, high-risk maternity care, and reproductive endocrine health.',
    email: 'priya.sharma@inspirezest.com',
    phone: '+91 9567333266',
    room: 'Womens Care Center, Suite 410',
    username: 'dr.sharma',
    password: 'password123',
    availableDates: [
      getFutureDate(2),
      getFutureDate(3),
      getFutureDate(5),
      getFutureDate(7),
      getFutureDate(10),
      getFutureDate(13),
    ],
    timeSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM'],
    consultationFee: 175,
  },
  {
    id: 'doc-vance',
    name: 'Dr. Marcus Vance',
    specializationId: 'spec-ophthalmology',
    specializationName: 'Ophthalmology',
    experienceYears: 16,
    rating: 4.92,
    reviewCount: 210,
    sourceImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    bio: 'Board-certified Ophthalmologist and Vitreoretinal Surgeon. Specialized in advanced cataracts, diabetic retinopathy, and laser refractive procedures.',
    email: 'marcus.vance@inspirezest.com',
    phone: '+91 9567333266',
    room: 'Eye Institute, Suite 215',
    username: 'dr.vance',
    password: 'password123',
    availableDates: [
      getFutureDate(1),
      getFutureDate(4),
      getFutureDate(5),
      getFutureDate(8),
      getFutureDate(11),
      getFutureDate(15),
    ],
    timeSlots: ['09:15 AM', '10:45 AM', '01:45 PM', '03:15 PM'],
    consultationFee: 150,
  },
  {
    id: 'doc-bennett',
    name: 'Dr. Sofia Bennett',
    specializationId: 'spec-pediatrics',
    specializationName: 'Pediatrics',
    experienceYears: 8,
    rating: 4.85,
    reviewCount: 96,
    sourceImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    bio: 'General pediatrician focusing on adolescent health, early childhood nutrition, and preventive wellness programs.',
    email: 'sofia.bennett@inspirezest.com',
    phone: '+91 9567333266',
    room: 'Childrens Health Pavilion, Room 108',
    username: 'dr.bennett',
    password: 'password123',
    availableDates: [
      getFutureDate(2),
      getFutureDate(4),
      getFutureDate(6),
      getFutureDate(9),
      getFutureDate(12),
    ],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM'],
    consultationFee: 130,
  },
  {
    id: 'doc-gallagher',
    name: 'Dr. Liam Gallagher',
    specializationId: 'spec-cardiology',
    specializationName: 'Cardiology',
    experienceYears: 12,
    rating: 4.89,
    reviewCount: 114,
    sourceImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    bio: 'Cardiac electrophysiologist specializing in arrhythmia management, pacemaker implantation, and radiofrequency ablation.',
    email: 'liam.gallagher@inspirezest.com',
    phone: '+91 9567333266',
    room: 'Cath Lab Wing A, Suite 306',
    username: 'dr.gallagher',
    password: 'password123',
    availableDates: [
      getFutureDate(1),
      getFutureDate(3),
      getFutureDate(7),
      getFutureDate(10),
      getFutureDate(14),
    ],
    timeSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    consultationFee: 165,
  },
];

const rawPatients = [
  {
    id: 'pat-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+91 9567333266',
    age: 34,
    gender: 'Female',
    bloodGroup: 'A+',
    address: '2nd Floor, S N Junction, Velayudha Mansion, Junction, Karbala, Kollam',
    emergencyContact: 'Thomas Vance (Spouse) - +91 9567333266',
    registeredDate: '2026-02-14',
  },
  {
    id: 'pat-2',
    name: 'Marcus Brody',
    email: 'marcus.brody@example.com',
    phone: '+91 9567333266',
    age: 58,
    gender: 'Male',
    bloodGroup: 'O+',
    address: 'Karbala, Kollam, Kerala',
    emergencyContact: 'Diane Brody (Wife) - +91 9567333266',
    registeredDate: '2026-03-01',
  },
  {
    id: 'pat-3',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '+91 9567333266',
    age: 29,
    gender: 'Female',
    bloodGroup: 'B-',
    address: 'Velayudha Mansion, Karbala, Kollam',
    emergencyContact: 'Michael Chen (Brother) - +91 9567333266',
    registeredDate: '2026-04-12',
  },
  {
    id: 'pat-4',
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '+91 9567333266',
    age: 44,
    gender: 'Male',
    bloodGroup: 'AB+',
    address: 'S N Junction, Kollam, Kerala',
    emergencyContact: 'Claire Miller (Spouse) - +91 9567333266',
    registeredDate: '2026-05-20',
  },
];

async function run() {
  console.log('=== Step 1: Uploading Specialization Images to Cloudflare R2 ===');
  const uploadedSpecializations = [];
  for (const s of rawSpecializations) {
    try {
      console.log(`Downloading image for ${s.name}...`);
      const buf = await fetchBuffer(s.sourceImage);
      const r2Key = `specializations/${s.id}.jpg`;
      const r2Url = await uploadFile(r2Key, buf, 'image/jpeg');
      uploadedSpecializations.push({
        id: s.id,
        name: s.name,
        description: s.description,
        image: r2Url,
        doctorCount: s.doctorCount,
        icon: s.icon,
      });
    } catch (e) {
      console.error(`Failed for ${s.id}:`, e.message);
      uploadedSpecializations.push({ ...s, image: s.sourceImage });
    }
  }

  console.log('\n=== Step 2: Uploading Doctor Profile Images to Cloudflare R2 ===');
  const uploadedDoctors = [];
  for (const d of rawDoctors) {
    try {
      console.log(`Downloading avatar for ${d.name}...`);
      const buf = await fetchBuffer(d.sourceImage);
      const r2Key = `doctors/${d.id}.jpg`;
      const r2Url = await uploadFile(r2Key, buf, 'image/jpeg');
      const { sourceImage, ...rest } = d;
      uploadedDoctors.push({
        ...rest,
        profileImage: r2Url,
      });
    } catch (e) {
      console.error(`Failed for ${d.id}:`, e.message);
      const { sourceImage, ...rest } = d;
      uploadedDoctors.push({ ...rest, profileImage: sourceImage });
    }
  }

  console.log('\n=== Step 3: Preparing Appointments with Cloudflare R2 Doctor Avatars ===');
  const doctorImageMap = {};
  uploadedDoctors.forEach(doc => {
    doctorImageMap[doc.id] = doc.profileImage;
  });

  const appointments = [
    {
      id: 'APT-10821',
      patientId: 'pat-1',
      patientName: 'Eleanor Vance',
      patientEmail: 'eleanor.vance@example.com',
      patientPhone: '+91 9567333266',
      doctorId: 'doc-wright',
      doctorName: 'Dr. Alexander Wright',
      doctorSpecialization: 'Cardiology',
      doctorImage: doctorImageMap['doc-wright'],
      date: getFutureDate(2),
      timeSlot: '10:00 AM',
      status: 'Confirmed',
      reason: 'Follow-up consultation after Holter monitor test and mild palpitation assessment.',
      createdDate: getPastDate(3),
    },
    {
      id: 'APT-10764',
      patientId: 'pat-1',
      patientName: 'Eleanor Vance',
      patientEmail: 'eleanor.vance@example.com',
      patientPhone: '+91 9567333266',
      doctorId: 'doc-vance',
      doctorName: 'Dr. Marcus Vance',
      doctorSpecialization: 'Ophthalmology',
      doctorImage: doctorImageMap['doc-vance'],
      date: getPastDate(8),
      timeSlot: '01:45 PM',
      status: 'Completed',
      reason: 'Routine vision checkup and dry eye syndrome evaluation.',
      createdDate: getPastDate(15),
      prescription: {
        id: 'RX-90412',
        appointmentId: 'APT-10764',
        patientName: 'Eleanor Vance',
        patientAge: 34,
        doctorName: 'Dr. Marcus Vance',
        doctorSpecialization: 'Ophthalmology',
        doctorLicense: 'MD-MED-99482',
        date: getPastDate(8),
        medicines: [
          {
            id: 'med-1',
            name: 'Systane Ultra Lubricant Eye Drops',
            dosage: '1 drop in each eye',
            frequency: '4 times daily',
            duration: '30 days',
            instructions: 'Apply when experiencing strain or dry sensations. Discard bottle 60 days after opening.',
          },
          {
            id: 'med-2',
            name: 'Cyclosporine Ophthalmic Emulsion 0.05%',
            dosage: '1 drop',
            frequency: 'Twice daily (every 12 hours)',
            duration: '60 days',
            instructions: 'Invert single-use vial a few times before application. Do not touch eye tip.',
          },
        ],
        notes: 'Patient exhibits mild blepharitis and digital eye fatigue. Recommended 20-20-20 rule during computer use and warm compress in evenings.',
        followUpDate: getFutureDate(22),
      },
    },
    {
      id: 'APT-10819',
      patientId: 'pat-2',
      patientName: 'Marcus Brody',
      patientEmail: 'marcus.brody@example.com',
      patientPhone: '+91 9567333266',
      doctorId: 'doc-wright',
      doctorName: 'Dr. Alexander Wright',
      doctorSpecialization: 'Cardiology',
      doctorImage: doctorImageMap['doc-wright'],
      date: getFutureDate(1),
      timeSlot: '09:00 AM',
      status: 'Confirmed',
      reason: 'Hypertension evaluation and routine lipid panel check.',
      createdDate: getPastDate(2),
    },
    {
      id: 'APT-10755',
      patientId: 'pat-3',
      patientName: 'Sarah Chen',
      patientEmail: 'sarah.chen@example.com',
      patientPhone: '+91 9567333266',
      doctorId: 'doc-sharma',
      doctorName: 'Dr. Priya Sharma',
      doctorSpecialization: 'Gynecology',
      doctorImage: doctorImageMap['doc-sharma'],
      date: getFutureDate(3),
      timeSlot: '10:30 AM',
      status: 'Confirmed',
      reason: 'First trimester prenatal ultrasound review.',
      createdDate: getPastDate(4),
    },
    {
      id: 'APT-10740',
      patientId: 'pat-4',
      patientName: 'David Miller',
      patientEmail: 'david.miller@example.com',
      patientPhone: '+91 9567333266',
      doctorId: 'doc-rostova',
      doctorName: 'Dr. Elena Rostova',
      doctorSpecialization: 'Pediatrics',
      doctorImage: doctorImageMap['doc-rostova'],
      date: getPastDate(12),
      timeSlot: '08:30 AM',
      status: 'Completed',
      reason: 'Child immunization booster and growth milestones checkup.',
      createdDate: getPastDate(20),
      prescription: {
        id: 'RX-89912',
        appointmentId: 'APT-10740',
        patientName: 'Leo Miller (via David Miller)',
        patientAge: 6,
        doctorName: 'Dr. Elena Rostova',
        doctorSpecialization: 'Pediatrics',
        doctorLicense: 'MD-PED-55120',
        date: getPastDate(12),
        medicines: [
          {
            id: 'med-p1',
            name: 'Amoxicillin Oral Suspension 250mg/5mL',
            dosage: '5 mL',
            frequency: 'Three times daily with food',
            duration: '7 days',
            instructions: 'Shake well before each use. Complete entire antibiotic course even if fever resolves.',
          },
          {
            id: 'med-p2',
            name: 'Childrens Paracetamol Syrup 120mg/5mL',
            dosage: '5 mL as needed',
            frequency: 'Every 6 hours (Max 4 doses in 24 hrs)',
            duration: '3 days',
            instructions: 'For fever above 38.2°C or discomfort.',
          },
        ],
        notes: 'Mild acute otitis media in right ear. Hydration encouraged. Keep ears dry during bathing.',
        followUpDate: getPastDate(2),
      },
    },
  ];

  console.log('\n=== Step 4: Uploading Master JSON Datasets to Cloudflare R2 ===');
  await uploadFile('data/specializations.json', Buffer.from(JSON.stringify(uploadedSpecializations, null, 2)), 'application/json');
  await uploadFile('data/doctors.json', Buffer.from(JSON.stringify(uploadedDoctors, null, 2)), 'application/json');
  await uploadFile('data/patients.json', Buffer.from(JSON.stringify(rawPatients, null, 2)), 'application/json');
  await uploadFile('data/appointments.json', Buffer.from(JSON.stringify(appointments, null, 2)), 'application/json');

  const masterData = {
    updatedAt: new Date().toISOString(),
    hospital: {
      name: 'InspireZest Hospitals',
      address: '2nd Floor, S N Junction, Velayudha Mansion, Junction, Karbala, Kollam',
      phone: '+91 9567333266',
      email: 'info.klm@inspirezest.com',
    },
    specializations: uploadedSpecializations,
    doctors: uploadedDoctors,
    patients: rawPatients,
    appointments: appointments,
  };
  await uploadFile('data/hospital_master.json', Buffer.from(JSON.stringify(masterData, null, 2)), 'application/json');

  console.log('\n🎉 ALL ASSETS & DATASETS SUCCESSFULLY UPLOADED TO CLOUDFLARE R2 OBJECT STORAGE!');
}

run().catch(err => {
  console.error('Upload Error:', err);
  process.exit(1);
});

