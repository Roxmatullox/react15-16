 

import { NavLink } from "react-router-dom";
import { useGetDataQuery } from "../../redux/queries/data";
import {  } from "./DashboardPage.scss"; 

const DashboardPage = () => {


  let active = 1
  let search = ""
  const {data : users , isFetching : userLoading } = useGetDataQuery({url:"users" , search , active})
  const {data : experiences , isFetching : experienceLoading } = useGetDataQuery({url:"experiences" , search , active})
  const {data : portfolios , isFetching : portfoliosLoading } = useGetDataQuery({url:"portfolios" , search , active})
  const {data : skills , isFetching : skillsLoading } = useGetDataQuery({url:"skills" , search , active})


  let UsersTotal
  let ExperiencesTotal
  let PortfoliosTotal
  let SkillsTotal

  if (users) {
    UsersTotal = users.pagination.total
  }

  if (experiences) {
    ExperiencesTotal = experiences.pagination.total
  }

  if (portfolios) {
    PortfoliosTotal = portfolios.pagination.total
  }

  if (skills) {
    SkillsTotal = skills.pagination.total
  }

   return (
     <div>
      <div className="dashboard-page">
        <div>
          <NavLink to="/users">
            <h2>Users : {userLoading ? <div className="loader"></div> : UsersTotal}</h2>
            <p>
              Users is dolor, sit amet consectetur adipisicing elit. Reiciendis quibusdam maxime, perspiciatis quis ipsam corrupti nostrum sapiente consequatur, molestiae distinctio magnam eveniet, magni praesentium. Omnis hic aspernatur voluptatibus rerum porro. Debitis nemo perferendis error veniam ad magni totam possimus neque fuga nobis distinctio officiis sunt veritatis repellendus, quos amet excepturi voluptatibus in asperiores eum! Adipisci culpa ipsa rem doloribus cupiditate sint nesciunt? Architecto quasi quam hic assumenda! Neque, quam suscipit natus reprehenderit ducimus modi optio repudiandae deleniti consequuntur ex sequi eligendi quod quia mollitia provident sint quaerat doloribus, atque distinctio aliquid non, nihil tenetur? Voluptate accusantium alias fugiat unde suscipit.
            </p>
            <h4>rzzzy.</h4>
          </NavLink>
        </div>
        <div>
          <NavLink to="/experiences">
            <h2>Experience : {experienceLoading ? <div className="loader"></div> : ExperiencesTotal}</h2>
            <p>
              Experience is dolor, sit amet consectetur adipisicing elit. Reiciendis quibusdam maxime, perspiciatis quis ipsam corrupti nostrum sapiente consequatur, molestiae distinctio magnam eveniet, magni praesentium. Omnis hic aspernatur voluptatibus rerum porro. Debitis nemo perferendis error veniam ad magni totam possimus neque fuga nobis distinctio officiis sunt veritatis repellendus, quos amet excepturi voluptatibus in asperiores eum! Adipisci culpa ipsa rem doloribus cupiditate sint nesciunt? Architecto quasi quam hic assumenda! Neque, quam suscipit natus reprehenderit ducimus modi optio repudiandae deleniti consequuntur ex sequi eligendi quod quia mollitia provident sint quaerat doloribus, atque distinctio aliquid non, nihil tenetur? Voluptate accusantium alias fugiat unde suscipit.
            </p>
            <h4>rzzzy.</h4>
          </NavLink>
        </div>
        <div>
          <NavLink to="/portfolios">
            <h2>Portfolios : {portfoliosLoading ? <div className="loader"></div> : PortfoliosTotal}</h2>
            <p>
              Portfolios is dolor, sit amet consectetur adipisicing elit. Reiciendis quibusdam maxime, perspiciatis quis ipsam corrupti nostrum sapiente consequatur, molestiae distinctio magnam eveniet, magni praesentium. Omnis hic aspernatur voluptatibus rerum porro. Debitis nemo perferendis error veniam ad magni totam possimus neque fuga nobis distinctio officiis sunt veritatis repellendus, quos amet excepturi voluptatibus in asperiores eum! Adipisci culpa ipsa rem doloribus cupiditate sint nesciunt? Architecto quasi quam hic assumenda! Neque, quam suscipit natus reprehenderit ducimus modi optio repudiandae deleniti consequuntur ex sequi eligendi quod quia mollitia provident sint quaerat doloribus, atque distinctio aliquid non, nihil tenetur? Voluptate accusantium alias fugiat unde suscipit.
            </p>
            <h4>rzzzy.</h4>
          </NavLink>
        </div>
        <div>
          <NavLink to="/skills">
            <h2>Skills : {skillsLoading ? <div className="loader"></div> : SkillsTotal}</h2>
            <p>
              Skills is ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis quibusdam maxime, perspiciatis quis ipsam corrupti nostrum sapiente consequatur, molestiae distinctio magnam eveniet, magni praesentium. Omnis hic aspernatur voluptatibus rerum porro. Debitis nemo perferendis error veniam ad magni totam possimus neque fuga nobis distinctio officiis sunt veritatis repellendus, quos amet excepturi voluptatibus in asperiores eum! Adipisci culpa ipsa rem doloribus cupiditate sint nesciunt? Architecto quasi quam hic assumenda! Neque, quam suscipit natus reprehenderit ducimus modi optio repudiandae deleniti consequuntur ex sequi eligendi quod quia mollitia provident sint quaerat doloribus, atque distinctio aliquid non, nihil tenetur? Voluptate accusantium alias fugiat unde suscipit.
            </p>
            <h4>rzzzy.</h4>
          </NavLink>
        </div>
      </div>
     </div>
   )
 }
 
 export default DashboardPage