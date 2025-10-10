function Contact() {
  return (
    <div className="flex flex-col flex-1 my-8 max-w-2xl mx-auto px-2 gap-8">
      <h1 className="text-2xl font-bold mb-3">Contact FlockGuard</h1>
      <section>
        <p>
          Have feedback, need support, or want to learn more about how FlockGuard is making livestock farming smarter and safer? Reach out to our team anytime!
        </p>
      </section>
      <section className="space-y-2">
        <div>
          <span className="font-semibold">GitHub Issues & Contributions:</span>
          <br />
          <a
            className="text-blue-500 underline"
            href="https://github.com/rahul-suthar/flockguard"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/rahul-suthar/flockguard
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact