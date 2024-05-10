import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const ModalTaskCompletion: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void; taskId: string; onTaskCompletion: () => void }> = ({ isOpen, setIsOpen, taskId, onTaskCompletion }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setIsOpen(false);
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setIsOpen(false);
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleYesClick = async () => {
    try {
      // Fetch the current task data
      const response = await axios.get(`http://24.133.52.46:8000/api/enterprise_tasks/${taskId}/`);
      const task = response.data;

      // Update the status to 'Done'
      task.status = 'Done';

      // Send the updated task back
      await axios.put(`http://24.133.52.46:8000/api/enterprise_tasks/${taskId}/`, task);

      setIsOpen(false);
      setModalOpen(false);

      // Call the onTaskCompletion function
      onTaskCompletion();
    } catch (error) {
      console.error('Failed to update task status:', error);
      alert('Failed to update task status. Please try again.');
    }
  };

  return (
    <div>
      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 p-2 ${isOpen ? 'block' : 'hidden'
          }`}
      >
        <div
          ref={modal}
          onFocus={() => {
            setModalOpen(true)
            setIsOpen(true)
          }}
          onBlur={() => {
            setModalOpen(false)
            setIsOpen(false)
          }}
          className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white px-4 py-6 text-center dark:bg-boxdark md:py-15 flex flex-col items-center justify-center"
        >
          <h1 className="text-title-xxl font-bold">Is this task done?</h1>
          <div className="2xsm:w-1/2 w-full px-3 mt-4 flex justify-around">
            <button
              onClick={() => handleYesClick()}
              className="block mx-5 w-full rounded border border-stroke bg-gray py-3 px-6 text-center font-medium text-black transition hover:border-meta-3 hover:bg-meta-3 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-3 dark:hover:bg-meta-3"
            >
              Yes
            </button>
            <button
              onClick={() => { setIsOpen(false); setModalOpen(false) }}
              className="block w-full rounded border border-stroke bg-gray py-3 px-6 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTaskCompletion;