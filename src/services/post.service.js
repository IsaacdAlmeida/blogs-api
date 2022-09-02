const { User, Category, BlogPost, PostCategory, sequelize } = require('../database/models');

const postService = {
  getAll: async () => {
    const result = await BlogPost.findAll({
      include: [{
        model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category, 
        as: 'categories',
      }],
    });

    return result;
  },

  findByPk: async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [{
        model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category, 
        as: 'categories',
      }],
    });

    return post;
  },

  create: async ({ title, content, categoryIds, userId }) => {
    const result = await Category.findAndCountAll({
      where: { id: categoryIds },
    });

    if (!result.count) return null;
    
    const transactionResult = await sequelize.transaction(async (transaction) => {
      const postCreated = await BlogPost.create(
        { title, content, userId }, 
        { transaction },
        );
      
      const CategoriesIdsMapped = categoryIds.map((item) => ({
        postId: postCreated.dataValues.id, categoryId: item,
      }));

      // console.log(CategoriesIdsMapped);

      await PostCategory.bulkCreate(CategoriesIdsMapped, { transaction });

      return postCreated;
    });

    return transactionResult;
  },
};

module.exports = postService;

// criar novo POST
// o ID do blogPosts vai ser chave primária do postCategories...
// o PostCategories precisa do id de Categories.
// requisito pede:
/* {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
} */

// o id vai ser o do token - feito
// title, content e categoryIds vem do body

// category id precisa existir, então preciso verificar na tabela de Categories se ele existe

// quando crio o post eu preciso criar tbm o postCategories, que vai receber os ids das categorias e o id do post, nesse caso se eu criar um post, ele vai ter id 3, mas pode ter múltiplas categorias (1 e 2), então a tabela postCategories fica 3 / 1 e 3 / 2. -> utiliza bulkcreate, mapear as categorias que vem do body, e criar 'em massa', dessa forma conseguimos criar tbm a tabela de postCategories

// o retorno precisa ter 
/* {
  "id": 3, automático
  "title": "Latest updates, August 1st", body
  "content": "The whole text for the blog post goes here in this key", body
  "userId": 1, do req.data/token
  "updated": "2022-05-18T18:00:01.196Z", automático
  "published": "2022-05-18T18:00:01.196Z" automático
} */