import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot, doc, updateDoc, query, where } from "firebase/firestore";
import { toast } from "react-toastify";


let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");

export const postStatus = (object) => {
    addDoc(postsRef, object)
      .then(() => {
        toast.success("Post has been added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
};

export const getStatus = (setAllstatus) => {
  onSnapshot(postsRef, (response) => {
    setAllstatus(
      response.docs.map((docs) => {
      })
    );
  });
};

export const getSingleSatus = (setAllstatus, id) => {
  const singlePostQuery = query(postRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllstatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), userID: docs.id };
      })
      .filter((item) => {
        return item.email === localStorage.getItem("userEmail");
      })[0]
    );
  });
};

export const editProfile = (userID, plaLoad) => {
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, plaLoad)
  .then(() => {
    toast.success("Profile has been updated successfully");
  })
  .catch((err) => {
    console.log(err);
  });
};

export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Connection Added!");
  } catch (err) {
    console.log(err);
  }
};