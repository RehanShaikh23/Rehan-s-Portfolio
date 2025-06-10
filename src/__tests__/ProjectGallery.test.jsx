import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectGallery from '../components/Projects/ProjectGallery';

// Mock the personalInfo data
jest.mock('../data/personalInfo', () => ({
  projects: [
    {
      id: 1,
      title: 'Test Project 1',
      description: 'Test description 1',
      image: 'test-image-1.jpg',
      technologies: ['React', 'JavaScript'],
      features: ['Feature 1', 'Feature 2'],
      githubUrl: 'https://github.com/RehanShaikh23/GroupManagementFinal',
      liveUrl: 'https://group-management-final.vercel.app/',
      category: 'Web Application'
    },
    {
      id: 2,
      title: 'Test Project 2',
      description: 'Test description 2',
      image: 'test-image-2.jpg',
      technologies: ['Node.js', 'MongoDB'],
      features: ['Feature 3', 'Feature 4'],
      githubUrl: 'https://github.com/test2',
      liveUrl: 'https://test2.com',
      category: 'Full Stack'
    }
  ]
}));

describe('ProjectGallery', () => {
  beforeEach(() => {
    // Mock window.open
    global.open = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders project gallery with projects', () => {
    render(<ProjectGallery />);
    
    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.getByText('Test Project 2')).toBeInTheDocument();
  });

  test('filters projects by category', async () => {
    const user = userEvent.setup();
    render(<ProjectGallery />);
    
    // Click on Web Application filter
    const webAppFilter = screen.getByText('Web Application');
    await user.click(webAppFilter);
    
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument();
  });

  test('opens project modal when view details is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectGallery />);
    
    // Find and click the first "View Details" button
    const viewDetailsButtons = screen.getAllByText('View Details');
    await user.click(viewDetailsButtons[0]);
    
    // Check if modal content is displayed
    await waitFor(() => {
      expect(screen.getByText('Key Features:')).toBeInTheDocument();
    });
  });

  test('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectGallery />);
    
    // Open modal
    const viewDetailsButtons = screen.getAllByText('View Details');
    await user.click(viewDetailsButtons[0]);
    
    // Close modal
    const closeButton = screen.getByText('×');
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Key Features:')).not.toBeInTheDocument();
    });
  });

  test('opens external links when buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectGallery />);
    
    // Click on Live Demo button
    const liveDemoButtons = screen.getAllByText('Live Demo');
    await user.click(liveDemoButtons[0]);
    
    expect(global.open).toHaveBeenCalledWith('https://test1.com', '_blank', 'noopener,noreferrer');
  });

  test('displays correct project information', () => {
    render(<ProjectGallery />);
    
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Web Application')).toBeInTheDocument();
  });

  test('handles keyboard navigation for accessibility', async () => {
    const user = userEvent.setup();
    render(<ProjectGallery />);
    
    // Tab to the first filter button
    await user.tab();
    expect(screen.getByText('All')).toHaveFocus();
    
    // Press Enter to activate filter
    await user.keyboard('{Enter}');
    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
  });
});