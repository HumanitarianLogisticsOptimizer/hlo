import React, { useState, useRef, useEffect } from 'react'

interface CodeWithPopoverProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CodeWithPopover: React.FC<CodeWithPopoverProps> = ({ onChange }) => {
    const [popoversOpen, setPopoversOpen] = useState(false);
    const [codeError, setCodeError] = useState('');

    const trigger = useRef<any>(null);
    const popovers = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!popovers.current) return;
            if (
                !popoversOpen ||
                popovers.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setPopoversOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!popoversOpen || keyCode !== 27) return;
            setPopoversOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);

        // Validate the code
        const code = event.target.value;
        const codePattern = /^\d{6}$/;
        if (!codePattern.test(code)) {
            setCodeError('Code must be exactly 6 digits long');
        } else {
            setCodeError('');
        }
    };

    return (
        <div className="relative inline-block w-full">
            <div
                ref={trigger} // Attach the trigger ref here
                onMouseEnter={() => setPopoversOpen(true)}
                onMouseLeave={() => setPopoversOpen(false)}
            >
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                    Your Code
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="code"
                        onChange={handleCodeChange}
                        pattern="^\d{6}$"
                        placeholder="Enter your 6-digit code"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-4 pl-6 pr-10 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className=" text-danger font-bold">{codeError}</span>
                </div>
            </div>
            <div
                ref={popovers} // Attach the popovers ref here
                onFocus={() => setPopoversOpen(true)}
                onBlur={() => setPopoversOpen(false)}
                className={`absolute left-1/2 top-full z-20 mt-3 w-75 -translate-x-1/2 rounded bg-white drop-shadow-5 dark:bg-meta-4 ${popoversOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <span className="absolute -top-1.5 left-1/2 -z-10 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white dark:bg-meta-4"></span>
                <div className="border-b border-stroke p-3 dark:border-strokedark">
                    <h4 className="text-center text-title-sm font-semibold text-black dark:text-white">
                        Code Requirements
                    </h4>
                </div>
                <div className="px-5 py-4.5 text-center">
                    <p className="font-medium"> Exactly 6 Digits</p>
                </div>
            </div>
        </div>
    );
};

export default CodeWithPopover;