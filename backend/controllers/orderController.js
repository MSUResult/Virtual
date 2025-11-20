import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
// We keep these imports but we won't use the real Razorpay instance to avoid crashes
import dotenv from "dotenv";
dotenv.config();

// --- BYPASS CONFIGURATION ---
// We comment this out or leave it unused so it doesn't crash your app if keys are missing
// const razorpayInstance = new razorpay({ ... }) 

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // --- BYPASS LOGIC STARTS HERE ---
    // Instead of calling Razorpay, we create a fake order manually
    const fakeOrder = {
      id: `order_mock_${new Date().getTime()}`, // Generate a fake Order ID
      entity: "order",
      amount: course.price * 100,
      amount_paid: 0,
      amount_due: course.price * 100,
      currency: "INR",
      receipt: `${courseId}`,
      status: "created",
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
    };

    console.log("Bypassed Razorpay Create Order. Sending fake data.");
    return res.status(200).json(fakeOrder);
    // --- BYPASS LOGIC ENDS HERE ---

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Order creation failed ${err}` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = req.body;

    // --- BYPASS LOGIC STARTS HERE ---
    console.log(`Bypassing verification for user: ${userId} and course: ${courseId}`);

    // We simply assume the payment is ALWAYS successful.
    // We skip the signature verification and skip fetching the order status.

    // 1. Update User Enrollment
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
      console.log("User enrolled successfully");
    }

    // 2. Update Course Enrollment
    const course = await Course.findById(courseId); // Removed .populate("lectures") as it's not strictly needed for saving, adds speed
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
      console.log("Course student list updated");
    }

    return res.status(200).json({ 
        message: "Payment verified (BYPASSED) and enrollment successful",
        success: true 
    });
    // --- BYPASS LOGIC ENDS HERE ---

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error during payment verification" });
  }
};