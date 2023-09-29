import { useContext, useRef, useState } from "react";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";
import { motion, useAnimate, stagger } from "framer-motion";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      // animating programically when a condition is meet with useAnimate HOOK 
      animate("input,textarea,ul", { x: [-10, 0, 10, 0] }, { type:'spring', duration:0.5,delay:stagger(0.09) });
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}  ref={scope} >
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.09,
                staggerDirection: screenLeft,
              },
            },
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { scale: 0.5, opacity: 0 }, //this works in the initial of parent(modal)
                visible: { scale: [0.1, 2, 1.1], opacity: 1 }, //this works in the animate of parent(modal) ,will pass through all [0.1, 2 ,1.1] states
              }}
              exit={{ scale: 1.1, opacity: 1 }} //while exiting stays in the same state
              transition={{ type: "spring" }}

              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
