const SignInButton = () => {
  return (
    <button className="border-primary-300 flex cursor-pointer items-center gap-6 border px-10 py-4 text-lg font-medium">
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default SignInButton;
