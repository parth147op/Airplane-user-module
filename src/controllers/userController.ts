import { Request, Response } from 'express';
import User from '../models/userModel';

// Sign up
export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ name, email, password }); // Add password hashing (e.g., bcrypt)
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Book flight
export const bookFlight = async (req: Request, res: Response) => {
  try {
    const { userId, flightId, seatId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Add booking
    user.bookings.push({ flightId, seatId });
    await user.save();

    return res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Cancel flight
export const cancelFlight = async (req: Request, res: Response) => {
  try {
    const { userId, flightId, seatId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Remove booking
    user.bookings = user.bookings.filter(
      (booking) => booking.flightId !== flightId || booking.seatId !== seatId
    );
    await user.save();

    return res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// View profile
export const viewProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    return res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
