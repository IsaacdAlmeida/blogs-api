const { Op } = require('sequelize');
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

      await PostCategory.bulkCreate(CategoriesIdsMapped, { transaction });

      return postCreated;
    });

    return transactionResult;
  },

  update: async ({ title, content, userId, id }) => {
    const post = await BlogPost.findByPk(id);

    if (post.userId !== userId) return null;

    await BlogPost.update(
      { title, content }, 
      { where: { id } },
    );

    const updatedPost = await BlogPost.findByPk(id, {
      include: [{
        model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category, 
        as: 'categories',
      }],
    });

    return updatedPost;
  },

  remove: async ({ userId, id }) => {
    const post = await BlogPost.findByPk(id);

    if (post.userId !== userId) return null;

    await BlogPost.destroy({ where: { id } });

    return true;
  },

  search: async (q) => {
    const result = await BlogPost.findAll({
      include: [{
        model: User, 
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category, 
        as: 'categories',
      }],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
    });

    return result;
  },
};

module.exports = postService;
