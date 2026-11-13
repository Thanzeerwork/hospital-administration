'use client';

import React, { useState } from 'react';
import { useHospital } from '@/context/HospitalContext';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { Specialization } from '@/types';
import {
  FolderPlus,
  Edit,
  Trash2,
  Stethoscope,
  Image as ImageIcon,
  CheckCircle2,
  Search,
  Layers,
  X,
} from 'lucide-react';

export const AdminSpecializationManagement: React.FC = () => {
  const {
    specializations,
    doctors,
    addSpecialization,
    editSpecialization,
    deleteSpecialization,
  } = useHospital();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<Specialization | null>(null);
  const [deletingSpecId, setDeletingSpecId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  );

  const filteredSpecializations = specializations.filter((spec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      spec.name.toLowerCase().includes(q) ||
      spec.description.toLowerCase().includes(q) ||
      spec.id.toLowerCase().includes(q)
    );
  });

  const handleOpenAdd = () => {
    setName('');
    setDescription('');
    setImage(
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    );
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (spec: Specialization) => {
    setEditingSpec(spec);
    setName(spec.name);
    setDescription(spec.description);
    setImage(spec.image);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSpecialization({
      name,
      description,
      image,
      doctorCount: 0,
      icon: 'Stethoscope',
    });

    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpec || !name.trim()) return;

    editSpecialization(editingSpec.id, {
      name,
      description,
      image,
    });

    setEditingSpec(null);
  };

  const handleConfirmDelete = () => {
    if (deletingSpecId) {
      deleteSpecialization(deletingSpecId);
      setDeletingSpecId(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              Specialization & Department Management
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E6F3F5] text-[#00829B] border border-[#00829B]/20">
              <Layers className="w-3.5 h-3.5" />
              {specializations.length} Total Departments
            </span>
          </div>
          <p className="text-xs text-[#666666] mt-0.5">
            Administer clinical departments, patient discovery categories, and department banners. Synced live with Patient Home.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<FolderPlus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          Add Specialization
        </Button>
      </div>

      {/* Search / Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4F6F6] p-3 rounded-xl border border-[#E5E7EB]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialities by department name or condition..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B] text-[#1A1A1A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#1A1A1A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="text-xs text-[#666666] font-medium">
          Showing <span className="font-bold text-[#1A1A1A]">{filteredSpecializations.length}</span> of {specializations.length} clinical departments
        </div>
      </div>

      {/* Specializations Grid */}
      {filteredSpecializations.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-[#E5E7EB]">
          <p className="text-sm font-semibold text-[#1A1A1A]">No clinical specializations match &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-[#666666] mt-1">Try adjusting your search keywords or clear the filter to see all departments.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-3 py-1.5 text-xs font-semibold text-[#00829B] bg-[#E6F3F5] rounded-md hover:bg-[#00829B]/20"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecializations.map((spec) => {
            const specDoctors = doctors.filter(
              (d) =>
                d.specializationId === spec.id ||
                d.specializationName.toLowerCase() === spec.name.toLowerCase()
            );

            return (
              <div
                key={spec.id}
                className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-40 w-full bg-[#F4F6F6]">
                    <img
                      src={spec.image}
                      alt={spec.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-bold">
                      {specDoctors.length} Specialists
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-base font-bold text-[#1A1A1A]">{spec.name}</h3>
                    <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="p-4 pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-[11px] text-[#666666] font-mono">{spec.id}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(spec)}
                      className="p-1.5 text-[#00829B] hover:bg-[#00829B]/10 rounded-md transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingSpecId(spec.id)}
                      className="p-1.5 text-[#DC5555] hover:bg-[#DC5555]/10 rounded-md transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Specialization Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Medical Specialization"
        subtitle="Create a new hospital department and category for patient discovery."
        maxWidth="md"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#1A1A1A] mb-1">
              Specialization Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Neurology, Orthopedics, Dermatology"
              className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-[#1A1A1A] mb-1">
              Associated Cover Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-[#1A1A1A] mb-1">
              Department Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide a summary of medical conditions treated and diagnostics performed in this department..."
              className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Specialization
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Specialization Modal */}
      {editingSpec && (
        <Modal
          isOpen={Boolean(editingSpec)}
          onClose={() => setEditingSpec(null)}
          title={`Edit ${editingSpec.name}`}
          subtitle="Modify department title, description, or banner photography."
          maxWidth="md"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">
                Specialization Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">
                Associated Cover Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#1A1A1A] mb-1">
                Department Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-2.5 bg-[#F4F6F6] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00829B]"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setEditingSpec(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update Specialization
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingSpecId)}
        onClose={() => setDeletingSpecId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Specialization Category?"
        message="Are you sure you want to remove this medical specialization? This will remove its category card from the patient home page."
        confirmText="Yes, Delete Specialization"
        variant="danger"
      />
    </div>
  );
};

