import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Find, Create & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">
          AI Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
      For the current world, 
      Prompt-Island is an open-source AI prompting platform 
      that allows users to find, create, and share original prompts.
      </p>

      <Feed />
     
    </section>
  )
}

export default Home