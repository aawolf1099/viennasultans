import { auth, db } from '../lib/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createAdminUser(email: string, password: string) {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to admins collection in Firestore
    await setDoc(doc(db, 'admins', user.uid), {
      email: user.email,
      role: 'admin',
      createdAt: new Date().toISOString(),
    });

    console.log('Admin user created successfully:', user.email);
    return user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

// Usage
const email = 'uasad1099@gmail.com'; // Replace with your admin email
const password = 'Asad@viennasultans10'; // Replace with your secure password

createAdminUser(email, password)
  .then(() => {
    console.log('Admin user creation completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  }); 