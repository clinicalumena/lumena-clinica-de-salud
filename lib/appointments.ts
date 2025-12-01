import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { Appointment } from '../types';

const COLLECTION_NAME = 'appointments';

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...appointment,
            createdAt: Timestamp.now(),
            // Ensure date is a Timestamp if it's passed as Date
            date: appointment.date instanceof Date ? Timestamp.fromDate(appointment.date) : appointment.date
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding appointment: ", error);
        throw error;
    }
};

export const getAppointmentsByService = async (serviceSlug: string): Promise<Appointment[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("serviceSlug", "==", serviceSlug),
            orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Appointment));
    } catch (error) {
        console.error("Error getting appointments: ", error);
        throw error;
    }
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Appointment));
    } catch (error) {
        console.error("Error getting all appointments: ", error);
        throw error;
    }
};
