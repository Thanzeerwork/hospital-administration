'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { HospitalBlog } from '@/types';
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  User,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const AdminBlogManagement: React.FC = () => {
  const { blogs, addBlog, editBlog, deleteBlog } = useHospital();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<HospitalBlog | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gastroenterology');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('4 min read');
  const [tagColor, setTagColor] = useState('#00829B');

  const defaultPresets = [
    {
      category: 'Gastroenterology',
      color: '#00829B',
      image: 'https://cdn.sanity.io/images/0xgev689/production/fbba20467ff290d573a6acefbfd7856a2e5ab852-524x280.png',
    },
    {
      category: 'Orthopaedics & Spine',
      color: '#22A06B',
      image: 'https://cdn.sanity.io/images/0xgev689/production/9fef3635bfcf9b3fa373caa595cf9f78fd2b97ef-524x280.png',
    },
    {
      category: 'Paediatrics & NICU',
      color: '#E9A23B',
      image: 'https://cdn.sanity.io/images/0xgev689/production/ebb32e86916cc4a8301e44b4f2f559faf579dc8e-524x280.png',
    },
    {
      category: 'Cardiology',
      color: '#E53E3E',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Neurology',
      color: '#805AD5',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleOpenAdd = () => {
    setTitle('');
    setCategory('Cardiology');
    setAuthor('Dr. N Prathap Kumar, Chief Cardiologist');
    setImage('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80');
    setExcerpt('');
    setContent('');
    setReadTime('4 min read');
    setTagColor('#00829B');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (blog: HospitalBlog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setCategory(blog.category);
    setAuthor(blog.author);
    setImage(blog.image);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setReadTime(blog.readTime || '4 min read');
    setTagColor(blog.tagColor || '#00829B');
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addBlog({
      title,
      category,
      author: author || 'InspireZest Medical Staff',
      image: image || defaultPresets[0].image,
      excerpt: excerpt || content.substring(0, 120) + '...',
      content,
      readTime: readTime || '4 min read',
      tagColor: tagColor || '#00829B',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
    });

    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !title.trim() || !content.trim()) return;

    editBlog(editingBlog.id, {
      title,
      category,
      author,
      image,
      excerpt,
      content,
      readTime,
      tagColor,
    });

    setEditingBlog(null);
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
            Updates & Breakthroughs (Blog Management)
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Administer patient portal medical breakthrough articles, hospital announcements, and health advice blogs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          Publish New Blog
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title or department..."
            className="w-full pl-9 pr-3.5 py-2 text-xs text-[#1A1A1A] bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
          />
        </div>
        <div className="text-xs text-[#666666] self-end sm:self-auto">
          Displaying <span className="font-bold text-[#1A1A1A]">{filteredBlogs.length}</span> published articles
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: blog.tagColor || '#00829B' }}
                >
                  {blog.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-[#888888] mb-2">
                  <span>{blog.date}</span>
                  <span>{blog.readTime || '4 min read'}</span>
                </div>
                <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#00829B] transition-colors mb-2 leading-snug line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed mb-3">
                  {blog.excerpt}
                </p>
                <div className="text-[11px] text-[#00829B] font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="truncate">{blog.author}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(blog)}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#00829B] hover:border-[#00829B] transition-colors cursor-pointer"
                title="Edit blog"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setDeletingBlogId(blog.id)}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#E53E3E] hover:border-[#E53E3E] transition-colors cursor-pointer"
                title="Delete blog"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Publish New Breakthrough & Blog Article"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Breakthrough Non-Invasive Cardiac Diagnostics"
              className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Medical Category / Specialization *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const preset = defaultPresets.find((p) => p.category === e.target.value);
                  if (preset) {
                    setTagColor(preset.color);
                    if (!image || defaultPresets.some((p) => p.image === image)) {
                      setImage(preset.image);
                    }
                  }
                }}
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Orthopaedics & Spine">Orthopaedics & Spine</option>
                <option value="Paediatrics & NICU">Paediatrics & NICU</option>
                <option value="Neurology">Neurology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="General Health">General Health</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Author & Clinical Designation *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Dr. N Prathap Kumar, Chief Interventional Cardiologist"
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Estimated Read Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 4 min read"
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
              Short Excerpt / Teaser *
            </label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief 1-2 sentence overview shown on the card preview..."
              className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
              Full Article Body *
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full clinical article content, recommendations, medical insights..."
              className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Article
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingBlog && (
        <Modal
          isOpen={Boolean(editingBlog)}
          onClose={() => setEditingBlog(null)}
          title={`Edit Article: ${editingBlog.title}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                  Medical Category
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                  Author
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                  Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Excerpt
              </label>
              <input
                type="text"
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1A1A] block mb-1">
                Full Article Content
              </label>
              <textarea
                required
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingBlog(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingBlogId)}
        onClose={() => setDeletingBlogId(null)}
        onConfirm={() => {
          if (deletingBlogId) {
            deleteBlog(deletingBlogId);
            setDeletingBlogId(null);
          }
        }}
        title="Remove Article"
        message="Are you sure you want to remove this article? It will no longer appear on the patient portal."
        confirmText="Delete Article"
        variant="danger"
      />
    </div>
  );
};

