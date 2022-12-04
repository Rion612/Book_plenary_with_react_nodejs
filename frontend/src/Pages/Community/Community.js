import Layout from "../../Components/Layouts/Layout";
import "./community.scss";
import booksCommunity from "../../data/community";

const Community = () => {
    return (
      <Layout>
        <div className="communityRootDiv">
          <h2>Bangladeshi book clubs you should follow</h2>
          {booksCommunity &&
            booksCommunity.map((item, index) => {
              return(
                <div className="clubInfoHolder" key={index}>
                <img
                  src={item.image}
                  alt="ClubImage"
                  className="clubImage"
                />
                <div>
                  <h2 style={{ color: "blue" }}>{item.name}</h2>
                  <p className="clubInfoText">
                    {item.description}
                  </p>
                  <a href={item.link}>
                    {item.link}
                  </a>
                </div>
              </div>
              )
            })}
        </div>
      </Layout>
    );
}
export default Community;